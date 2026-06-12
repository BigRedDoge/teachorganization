resource "cloudflare_dns_record" "apex" {
    zone_id = var.cloudflare_zone_id
    name    = var.domain
    type    = "CNAME"
    content = aws_cloudfront_distribution.site.domain_name
    ttl     = 1      # "automatic"
    proxied = false  # gray cloud — critical
}

resource "cloudflare_dns_record" "www" {
    zone_id = var.cloudflare_zone_id
    name    = "www.${var.domain}"
    type    = "CNAME"
    content = aws_cloudfront_distribution.site.domain_name
    ttl     = 1
    proxied = false
}