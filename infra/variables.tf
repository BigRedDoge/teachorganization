variable "domain" {
  type        = string
  description = "The domain name for the application"
  default     = "teachorganization.com"
}

variable "cloudflare_zone_id" {
  type        = string
  description = "Zone ID from the Cloudflare dashboard overview page"
}

variable "contact_recipient_email" {
  type        = string
  description = "Email address to receive contact form submissions"
  sensitive   = true
}

variable "github_repo" {
  type        = string
  description = "GitHub repo allowed to deploy, as org/name"
  default     = "BigRedDoge/teachorganization"
}