let bestAltitude = 0;
let unlockedLevel = 1;

function launchRocket() {
  const drag = Number(document.getElementById("drag").value);
  const stability = Number(document.getElementById("stability").value);
  const fuel = Number(document.getElementById("fuel").value);
  const mass = Number(document.getElementById("mass").value);
  const thrust = Number(document.getElementById("thrust").value);
  const rocket = document.getElementById("rocket");

  const levelSelect = document.getElementById("level");
  const target = Number(levelSelect.value);
  const currentLevel = levelSelect.selectedIndex + 1;

  let altitude = fuel + thrust - mass;

  if (altitude < 0) {
    altitude = 0;
  }

  if (altitude > bestAltitude) {
    bestAltitude = altitude;
  }

  let height = altitude * 2;

rocket.style.transform =
  "translateX(-50%) translateY(-" + height + "px) scale(1)";

  let stars = "⭐☆☆";
  let rank = "Keep Trying 🚀";

  if (altitude >= target * 0.7) {
    stars = "⭐⭐☆";
    rank = "Almost There 🌟";
  }

  if (altitude >= target) {
    stars = "⭐⭐⭐";
    rank = "Orbit Master 🏆";

    if (currentLevel === 1 && unlockedLevel < 2) {
      unlockedLevel = 2;
      levelSelect.options[1].disabled = false;
      levelSelect.options[1].text = "Stage 2: Stable Orbit";
    }

    if (currentLevel === 2 && unlockedLevel < 3) {
      unlockedLevel = 3;
      levelSelect.options[2].disabled = false;
      levelSelect.options[2].text = "Stage 3: Satellite Deployment";
    }
  }

  document.getElementById("score").innerHTML =
    "Target: " + target +
    " km | Current Altitude: " +
    altitude +
    " km | Best Altitude: " +
    bestAltitude +
    " km | Rating: " +
    stars +
    " | " +
    rank;

  if (
  altitude >= target &&
  (currentLevel === 1 || (drag <= 40 && stability >= 60))
) {
    document.getElementById("result").innerHTML =
      "🚀 Level Complete!<br><br><b>Your Altitude:</b> " + altitude + " km<br><br><b>Why it worked:</b><br>Your rocket had enough fuel and thrust compared to its mass to reach the target.";
  } 
  else if (currentLevel >= 2 && drag > 40) {
  document.getElementById("result").innerHTML =
    "🌬️ Too Much Drag!<br><br><b>Your Altitude:</b> " + altitude + " km<br><br><b>What happened?</b><br>Your rocket had too much air resistance, so it lost speed.<br><br><b>How to fix it:</b><br>Lower drag to make the rocket more aerodynamic.";
}
else if (currentLevel >= 2 && stability < 60) {
  document.getElementById("result").innerHTML =
    "⚖️ Unstable Flight!<br><br><b>Your Altitude:</b> " + altitude + " km<br><br><b>What happened?</b><br>Your rocket became unstable during launch.<br><br><b>How to fix it:</b><br>Increase stability to keep the rocket under control.";
}
else if (altitude >= target * 0.7) {
    document.getElementById("result").innerHTML =
      "🟡 Almost There!<br><br><b>Your Altitude:</b> " + altitude + " km<br><br><b>What happened?</b><br>Your rocket launched well, but did not quite reach the target.<br><br><b>How to fix it:</b><br>Try increasing fuel or thrust, or lowering mass.";
  } 
  else {
   let fix = "Try increasing fuel or thrust, or lowering mass.";

if (currentLevel >= 2 && drag > 40) {
  fix = "Your drag is too high. Lower drag to make your rocket more aerodynamic.";
} 
else if (currentLevel >= 2 && stability < 60) {
  fix = "Your rocket is unstable. Increase stability to maintain control during flight.";
} 
else if (fuel < 30) {
  fix = "Your fuel is very low. Increase fuel so the rocket can keep accelerating.";
} 
else if (mass > 70) {
  fix = "Your rocket is very heavy. Lower the mass or increase thrust.";
} 
else if (thrust < 40) {
  fix = "Your thrust is low. Increase thrust so the engine can push harder.";
}

    document.getElementById("result").innerHTML =
      "❌ Mission Failed<br><br><b>Your Altitude:</b> " + altitude + " km<br><br><b>What happened?</b><br>Your rocket did not reach the " + target + " km target.<br><br><b>How to fix it:</b><br>" + fix;
  }
}

function resetRocket() {
  document.getElementById("fuel").value = 50;
  document.getElementById("mass").value = 50;
  document.getElementById("thrust").value = 50;
  document.getElementById("drag").value = 60;
  document.getElementById("stability").value = 40;

  document.getElementById("rocket").style.transform = 
"translateX(-50%) scale(1)";

  document.getElementById("score").innerHTML =
    "Target: 100 km | Current Altitude: 0 km | Best Altitude: " + bestAltitude + " km | Rating: ☆☆☆";

  document.getElementById("result").innerHTML =
    "Mission report will appear here.";
}

document.getElementById("level").addEventListener("change", function () {

  const currentLevel = this.selectedIndex + 1;

  if (currentLevel >= 2) {
    document.getElementById("stage2-controls").style.display = "block";
  } else {
    document.getElementById("stage2-controls").style.display = "none";
  }

});