import * as Plotly from "plotly.js-dist";
import * as math from 'mathjs';


// let num_of_SDCM = 8;

let num_of_SDCM = 3;
let CIEx0 = 0; // center of ellipse
let CIEy0 = 0;
let testx = 0;
let testy = 0;


document.getElementById("myForm").addEventListener("submit", function (event) {
  // prevent the form from submitting normally
  event.preventDefault();

  // get the input field
  let conCIEx = document.getElementById("conx");
  let conCIEy = document.getElementById("cony");
  let testCIEx = document.getElementById("testx");
  let testCIEy = document.getElementById("testy");
  let sdcm = document.getElementById("sdcm")

  CIEx0 = conCIEx.value;
  CIEy0 = conCIEy.value;
  testx = testCIEx.value;
  testy = testCIEy.value;
  num_of_SDCM = sdcm.value

  // log the value of the input field
  // console.log(inputField.value);
  // console.log(inputField2.value);
  getData();
});



async function getData() {

  function circle(r, x0, y0) {
    let theta = math.range(0, 2 * Math.PI + Math.PI / 36, Math.PI / 36).toArray(); // 72 samples over 2PI radians including the endpoint
    let x = theta.map(function (t) { return x0 + r * Math.cos(t); });
    let y = theta.map(function (t) { return y0 + r * Math.sin(t); });
    return { theta, x, y };
  }

  function uprime_to_x(uprime, vprime) {
    return (9 * uprime) / (6 * uprime - 16 * vprime + 12);
  }

  function vprime_to_y(uprime, vprime) {
    return (4 * vprime) / (6 * uprime - 16 * vprime + 12);
  }

  function x_to_uprime(x, y) {
    return (4 * x) / (-2 * x + 12 * y + 3);
  }

  function y_to_vprime(x, y) {
    return (9 * y) / (-2 * x + 12 * y + 3);
  }

  let SDCM = 0.0011; // radius of a one SDCM circle in u', v' space

  let uprime0 = x_to_uprime(CIEx0, CIEy0);
  let vprime0 = y_to_vprime(CIEx0, CIEy0);

  let { theta, x, y } = circle(num_of_SDCM * SDCM, uprime0, vprime0);

  let CIEx = x.map(function (xi, i) { return uprime_to_x(xi, y[i]); });
  let CIEy = x.map(function (xi, i) { return vprime_to_y(xi, y[i]); });

  let trace1 = {
    x: CIEx,
    y: CIEy,
    mode: 'lines',
    name: 'SDCM',
    line: {
      color: 'rgb(219, 64, 82)',
      width: 3
    }
  };

  let trace2 = {
    x: [CIEx0],
    y: [CIEy0],
    mode: 'markers',
    name: 'SDCM Center',
    marker: {
      color: 'rgb(219, 64, 82)',
      size: 8
    }
  };

  let trace3 = {
    x: [testx],
    y: [testy],
    mode: 'markers',
    name: 'Test Point',
    marker: {
      color: 'rgb(31, 119, 180)',
      size: 8
    }
  };

  let layout = {
    xaxis: {
      title: {
        text: 'CIE x',
      },
    },
    yaxis: {
      title: {
        text: 'CIE y',
      },
      scaleanchor: "x",
      scaleratio: 1,
    },
  };

  let data = [trace1, trace2, trace3];

  // Plotly.newPlot('myDiv', data, layout);

  Plotly.newPlot('xy', data, layout);

}


let trace1 = {
  x: [.350],
  y: [.350],
  mode: 'markers',
    name: 'Test Point',
    marker: {
      color: 'rgb(31, 119, 180)',
      size: 8
    }
};



let layout = {
  xaxis: {
    title: {
      text: 'CIE x',
    },
  },
  yaxis: {
    title: {
      text: 'CIE y',
    },
    scaleanchor: "x",
    scaleratio: 1,
  }
}

let data = [trace1];

Plotly.newPlot('xy', data, layout);



