// Error encapsulation, logging, auto-restart
function* root() {
    while (true) {
        try {
            yield race({
                ui: call(ui),
                api: call(api),
                device: call(device),
                connectivity: call(connectivity),
                abort: take(ABORT)
            });
        } catch (ex) {
            log("BOOM!", ex);
        }
    }
}
