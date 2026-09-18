function adminPanel() {
    const forms = [
        document.querySelector(".add-actor"),
        document.querySelector(".form__delete-actor"),
        document.querySelector(".form__update-cast"),
        document.querySelector(".form__redact-performance"),
        document.querySelector(".form__delete-performance"),
        document.querySelector(".form__update-actor"),
        document.querySelector(".form__redact-playbill"),
        document.querySelector(".form__delete-playbill"),
        document.querySelector(".form__add-playbill"),
        document.querySelector(".form__approve-review")
    ];

    forms.forEach(form => {
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const response = await fetch(form.action, {
                method: form.method,
                headers: {
                    "csrf-token": form.dataset.csrf
                },
                body: new FormData(form)
            });

            if (response.redirected) {
                window.location.href = response.url;
            }
        });
    });
}

adminPanel();
