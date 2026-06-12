terraform {
    backend "s3" {
        bucket = "teachorganization-terraform-state"
        key = "teachorganization/terraform.tfstate"
        region = "us-east-1"
        use_lockfile = true
    }
}