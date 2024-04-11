# provider "docker" {
#   host = "unix:///var/run/docker.sock"
# }

# # pulls the image
# resource "docker_image" "tindog" {
#   name = "calebyeboah/tindog"
# }

# # Create a container
# resource "docker_container" "tindog_web" {
#   image = docker_image.tindog.image_id
#   name = "tindog_web"

#   ports {
#     internal = 5000
#     external = 5000
#   }
# }
