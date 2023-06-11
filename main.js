window.onload = () => {
    init();
}

const init = () => {
    const simpleForm = document.querySelector("#simpleForm");
    if (simpleForm) {
        simpleForm.addEventListener("submit", function (e) {
            submitForm(e, this);
        });
    }
}

function buildJsonFormData(form) {
    const jsonFormData = {};
    for (const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
}

async function submitForm(e, form) {
    e.preventDefault();

    const jsonFormData = buildJsonFormData(form);
    const response = await performGetHttpRequest(`https://www.hebcal.com/converter?cfg=json&date=${jsonFormData.gdt}&g2h=1&strict=1&gs=${jsonFormData.gs}`);
    if (response) {
        document.getElementById("hebrew_date").innerHTML = response.hebrew;
    }
}

async function performGetHttpRequest(fetchLink) {
    if (!fetchLink) {
        throw new Error("Missing link");
    }
    try {
        return rawResponse = await fetch(fetchLink, {
            method: "Get",
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(response => response.json());
    }
    catch (err) {
        console.error(`Error: ${err}`);
        throw err;
    }
}
