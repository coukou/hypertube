<template>
  <div></div>
</template>

<script>
import grpcWeb from "grpc-web";
import { AuthServiceClient } from "../protos/auth/auth_grpc_web_pb";
import { ValidateRequest, Empty } from "../protos/auth/auth_pb";

const authService = new AuthServiceClient(
  "http://192.168.99.100:31380",
  null,
  null
);

export default {
  mounted() {
    const request = new ValidateRequest();
    request.setToken(this.$route.params.token);
    authService.validate(request, {}, err => {
      const toastData = {
        placement: "top",
        closeOnClick: true
      };
      if (err) {
        toastData.text = err.message;
        toastData.type = "danger";
      } else {
        toastData.text = "account activated";
        toastData.type = "success";
      }
      this.n3Toast(toastData);
      this.$router.replace("/");
    });
  }
};
</script>
