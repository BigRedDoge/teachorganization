terraform {
  backend "s3" {
    bucket       = "teachorganization-tfstate-a8f3"
    key          = "teachorganization/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}