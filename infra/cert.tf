resource "aws_acm_certificate" "site" {
    domain_name = var.domain
    subject_alternative_names = ["www.${var.domain}"]
    validation_method = "DNS"

    lifecycle {
      create_before_destroy = true
    }
}

resource "cloudflare_dns_record" "acm_validation" {
    for_each = {
        for dvo in aws_acm_certificate.site.domain_validation_options :
        dvo.domain_name => {
            name  = dvo.resource_record_name
            type  = dvo.resource_record_type
            value = dvo.resource_record_value
        }
    }

    zone_id = var.cloudflare_zone_id
    name = trimsuffix(each.value.name, ".")
    type = each.value.type
    ttl = 60
    proxied = false
}

resource "aws_acm_certificate_validation" "site" {
    certificate_arn = aws_acm_certificate.site.arn

    validation_record_fqdns = [
        for record in cloudflare_dns_record.acm_validation :
        record.name
    ]
}