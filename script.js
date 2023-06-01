(function () {
  "use strict";

  const type = document.getElementById("type");
  const unit = document.querySelectorAll(".unit");

  for (let i = 0; i < unit.length; i++) {
    console.log(unit[i]);
  }

  type.addEventListener("change", () => {
    const clickedOption = type.value;

    if (clickedOption == "length") {
      const lengthUnits = [
        '<option value="mm">Millimeter</option>',
        '<option value="cm">Centimeter</option>',
        '<option value="in">Inch</option>',
        '<option value="ft">Foot</option>',
        '<option value="m">Meter</option>',
        '<option value="km">Kilometer</option>',
        '<option value="mi">Mile</option>',
        '<option value="lbs">Pound</option>',
      ];
      for (let i = 0; i < 7; i++) {
        const lengthUnitList = lengthUnits.join();
        unit[i].innerHTML = lengthUnitList;
      }
    } else if (clickedOption == "mass") {
      const massUnits = [
        '<option value="mg">Milligram</option>',
        '<option value="cg">Centigram</option>',
        '<option value="dg">Decigram</option>',
        '<option value="g">Gram</option>',
        '<option value="dag">Decagram</option>',
        '<option value="hg">Hectogram</option>',
        '<option value="kg">Kilogram</option>',
        '<option value="lbs">Pound</option>',
      ];
      for (let i = 0; i < unit.length; i++) {
        const massUnitList = massUnits.join();
        unit[i].innerHTML = massUnitList;
      }
    } else {
      const timeUnits = [
        '<option value="ms">Millisecond</option>',
        '<option value="s">Second</option>',
        '<option value="min">Minute</option>',
        '<option value="hr">Hour</option>',
        '<option value="day">Day</option>',
        '<option value="week">Week</option>',
        '<option value="month">Month</option>',
        '<option value="year">Year</option>',
      ];
      for (let i = 0; i < unit.length; i++) {
        const timeUnitList = timeUnits.join();
        unit[i].innerHTML = timeUnitList;
      }
    }
  });

  document.getElementById("convert").addEventListener("click", () => {
    const inputValue = Number(document.getElementById("inputValue").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;

    const conversionFactors = {
      // Length
      mm: {
        cm: 0.1,
        in: 0.0393701,
        ft: 0.0032808,
        m: 0.001,
        km: 0.000001,
        mi: 0.000000621,
      },

      cm: {
        mm: 10,
        in: 0.393701,
        ft: 0.032808399,
        m: 0.01,
        km: 0.00001,
        mi: 0.00000621377952755905,
      },

      in: {
        mm: 25.4,
        cm: 2.54,
        ft: 0.0833333,
        m: 0.0254,
        km: 0.0000254,
        mi: 0.0000157828283,
      },

      ft: {
        mm: 304.8,
        cm: 30.48,
        in: 12,
        m: 0.3048,
        km: 0.0003048,
        mi: 0.000189394,
      },

      m: {
        mm: 1000,
        cm: 100,
        in: 39.3700787402,
        ft: 3.280839895,
        km: 0.001,
        mi: 0.000621371,
      },

      km: {
        mm: 1000000,
        cm: 100000,
        in: 39370.0787,
        ft: 3280.8399,
        m: 1000,
        mi: 0.621371,
      },

      mi: {
        mm: 1609344,
        cm: 160934.4,
        in: 63360,
        ft: 5280,
        m: 1609.344,
        km: 1.609344,
      },

      // Mass
      mg: {
        cg: 0.1,
        dg: 0.01,
        g: 0.001,
        dag: 0.0001,
        hg: 0.00001,
        kg: 0.000001,
        lbs: 0.00000220462262,
      },

      cg: {
        mg: 10,
        dg: 0.1,
        g: 0.01,
        dag: 0.001,
        hg: 0.0001,
        kg: 0.00001,
        lbs: 0.0000220462,
      },

      dg: {
        mg: 100,
        cg: 10,
        g: 0.1,
        dag: 0.01,
        hg: 0.001,
        kg: 0.0001,
        lbs: 0.0002204623,
      },

      g: {
        mg: 1000,
        cg: 100,
        dg: 10,
        dag: 0.1,
        hg: 0.01,
        kg: 0.001,
        lbs: 0.0022046226,
      },

      dag: {
        mg: 10000,
        cg: 1000,
        dg: 100,
        g: 10,
        hg: 0.1,
        kg: 0.01,
        lbs: 0.0220462262,
      },

      hg: {
        mg: 100000,
        cg: 10000,
        dg: 1000,
        g: 100,
        dag: 10,
        kg: 0.1,
        lbs: 0.2204622622,
      },

      kg: {
        mg: 1000000,
        cg: 100000,
        dg: 10000,
        g: 1000,
        dag: 100,
        hg: 10,
        lbs: 2.2046226218,
      },

      lbs: {
        mg: 453592.37,
        cg: 45359.22921969,
        dg: 4535.92370010035,
        g: 453.59237,
        dag: 45.359237,
        hg: 4.5359237,
        kg: 0.45359237,
      },

      // Time
      ms: {
        s: 0.001,
        min: 0.000016666666666667,
        hr: 0.000000277778,
        day: 0.0000000115741,
        week: 0.00000000165344,
        month: 0.000000000380517,
        year: 0.0000000000317098,
      },

      s: {
        ms: 1000,
        min: 0.016666666666667,
        hr: 0.0002777778,
        day: 0.000011574074074074,
        week: 0.00000165344,
        month: 0.000000380517,
        year: 0.0000000317098,
      },

      min: {
        ms: 60000,
        s: 60,
        hr: 0.0166666667,
        day: 0.0006944444,
        week: 0.0000992063,
        month: 0.000022831,
        year: 0.00000190259,
      },

      hr: {
        ms: 3600000,
        s: 3600,
        min: 60,
        day: 1 / 24,
        week: 0.005952381,
        month: 0.0013698630136986,
        year: 0.00011415525114155,
      },

      day: {
        ms: 86400000,
        s: 86400,
        min: 1440,
        hr: 24,
        week: 0.14285714285,
        month: 0.032876712328767,
        year: 0.0027397260273973,
      },

      week: {
        ms: 604800000,
        s: 604800,
        min: 10080,
        hr: 168,
        day: 7,
        month: 0.2299841886,
        year: 0.0191781,
      },

      month: {
        ms: 2628000000,
        s: 2628000,
        min: 43800,
        hr: 730.50637939986,
        day: 30.436806,
        week: 0.4345238095,
        year: 1 / 12,
      },

      year: {
        ms: 31540000000,
        s: 31540000,
        min: 525600,
        hr: 8760,
        day: 365,
        week: 52.14285714,
        month: 12,
      },
    };

    console.log(typeof inputValue);
    let result = 0;
    if (inputValue == 0) {
      console.log("hehe");
    } else if (fromUnit == toUnit) {
      result = inputValue;
    } else {
      result =
        Math.round(inputValue * conversionFactors[fromUnit][toUnit] * 1000000) /
        1000000;
    }

    document.getElementById(
      "result"
    ).innerText = `${inputValue}${fromUnit} = ${result}${toUnit}`;
  });
})();
