resource "aws_sesv2_email_identity" "domain" {
    email_identity = var.domain
}

resource "cloudflare_dns_record" "ses_dkim" {
    count = 3

    zone_id = var.cloudflare_zone_id
    name    = "${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}._domainkey.${var.domain}"
    type    = "CNAME"
    content = "${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}.dkim.amazonses.com"
    ttl     = 60
    proxied = false
}

resource "aws_sesv2_email_identity" "recipient" {
  email_identity = var.contact_recipient_email
}

resource "aws_iam_role" "contact_lambda" {
    name = "contact-form-lambda"
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Effect = "Allow"
            Principal = {
                Service = "lambda.amazonaws.com"
            }
            Action = "sts:AssumeRole"
        }]
    })
}

resource "aws_iam_role_policy_attachment" "contact_logs" {
    role = aws_iam_role.contact_lambda.name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "contact_ses" {
    name = "send-email"
    role = aws_iam_role.contact_lambda.id
    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Effect   = "Allow"
            Action   = "ses:SendEmail"
            Resource = [
                aws_sesv2_email_identity.domain.arn,
                aws_sesv2_email_identity.recipient.arn,
            ]
        }]
    })
}

data "archive_file" "contact" {
    type = "zip"
    source_dir  = "${path.module}/../lambda"
    output_path = "${path.module}/.build/contact.zip"
}

resource "aws_lambda_function" "contact" {
    function_name = "contact-form"
    role = aws_iam_role.contact_lambda.arn
    runtime = "nodejs22.x"
    handler = "index.handler"
    filename = data.archive_file.contact.output_path
    source_code_hash = data.archive_file.contact.output_base64sha256
    timeout = 10

    environment {
        variables = {
            RECIPIENT = var.contact_recipient_email
            SENDER = "noreply@${var.domain}"
        }
    }
}

resource "aws_lambda_function_url" "contact" {
    function_name = aws_lambda_function.contact.function_name
    authorization_type = "NONE"
}