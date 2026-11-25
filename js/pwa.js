"use strict";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js", {
        updateViaCache: "none"
      });

      await registration.update();
      console.log("Service Worker atualizado:", registration.scope);
    } catch (error) {
      console.error("Falha ao registrar/atualizar o Service Worker:", error);
    }
  });
}
