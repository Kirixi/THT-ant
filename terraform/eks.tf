module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = local.cluster_name
  cluster_version = "1.30"

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  cluster_endpoint_public_access = true

  eks_managed_node_group_defaults = {
    ami_type = "AL2_x86_64"

  }

  cluster_addons = {
    coredns = {
      most_recent = true
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent = true
    }
  }
  eks_managed_node_groups = {
    one = {
      name = "node-group-1"

      instance_types = ["t3.small", "t3a.small"]

      min_size     = 1
      max_size     = 1
      desired_size = 1
    }

    two = {
      name = "node-group-2"

      instance_types = ["t3.small", "t3a.small"]

      min_size     = 1
      max_size     = 1
      desired_size = 1
    }
  }
}