const startDateElement = document.querySelector('#startDate');
const endDateElement = document.querySelector('#endDate');
let startDate = startDateElement.value;
let endDate = endDateElement.value;
const ctx = document.getElementById('my-chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Bitcoin Price Index',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
        }
      ]
    }
  });

// show graph on load with previous by default values
window.onload = function() {
    getHistoricalData(startDate, endDate)
};

// call historical data function on start date input change 
startDateElement.addEventListener('input', (event) => {
    startDate = event.target.value;
    getHistoricalData(startDate, endDate)

})

// call historical data function on end date input change 
endDateElement.addEventListener('input', (event) => {
    endDate = event.target.value;
    getHistoricalData(startDate, endDate)
})

// function for getting api response
function getHistoricalData(startDate, endDate) {
    const apiURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;

    axios 
    .get(apiURL)
    .then(responseFromAPI => {
        printChart(responseFromAPI.data)
    })
}

// get data from object and invoke updateData() function
function printChart(bitcoinIndexData) {
    const dailyData = bitcoinIndexData.bpi;
    const dates = Object.keys(dailyData);
    const prices = Object.values(dailyData)
    updateData(chart, dates, prices)
}

// change data and update
function updateData(chart, label, data) {
    chart.data.labels = label;
    chart.data.datasets[0].data = data
    chart.update();
}