const fetchCurrencyData = async (value, currency) => {
    try {
        const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_7UStkUqQNBmahSoy8K635tE3Sjr5fK1UVPmVloZ2&base_currency=${currency}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data. Status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching currency data:", error);
        return null;
    }
};

const populateTable = (value, currency, currencyData) => {
    let tableBody = "";
    for (const key in currencyData) {
        if (currencyData.hasOwnProperty(key)) {
            const code = currencyData[key].code;
            const convertedValue = Math.round(currencyData[key].value * value);
            tableBody += `<tr>
                <td>${key}</td>
                <td>${code}</td>
                <td>${convertedValue}</td>
            </tr>`;
        }
    }
    const tableBodyElement = document.querySelector("tbody");
    tableBodyElement.innerHTML = tableBody;
};

const submitButton = document.querySelector(".btn");
submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const value = parseInt(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;
    const currencyData = await fetchCurrencyData(value, currency);
    if (currencyData) {
        document.querySelector(".output").style.display = "block";
        populateTable(value, currency, currencyData);
    }
});
