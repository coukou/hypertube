<template>
  <div></div>
</template>

<script>
import grpcWeb from "grpc-web";
import { AuthServiceClient } from "../protos/auth/auth_grpc_web_pb";
import * as pb from "../protos/auth/auth_pb";

const authService = new AuthServiceClient(
  "http://192.168.99.100:31380",
  null,
  null
);

export default {
  mounted() {
    const request = new pb.ActivateRequest();
    request.setToken(this.$route.params.token);
    authService.activate(request, {}, err => {
      const toastData = {
        placement: "top",
        closeOnClick: true
      };
      if (err) {
        toastData.text = this.$t(err.message);
        toastData.type = "danger";
      } else {
        toastData.text = this.$t("toast.account-validated");
        toastData.type = "success";
      }
      this.n3Toast(toastData);
      this.$router.replace("/");
    });
  }
};
</script>
