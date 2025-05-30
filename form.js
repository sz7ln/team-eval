//
const teams = {
      "1조": ["박서진", "권지민", "홍성현", "김민형", "전요섭"],
      "2조": ["ㅂㅂㅂ", "ㅈㅈㅈ", "ㄷㄷㄷ", "ㄱㄱㄱ"],
      "3조": ["ㅅㅅㅅ", "ㅁㅁㅁ", "ㄴㄴㄴ", "ㅇㅇㅇ"]
      "4조": ["ㅋㅋㅋ", "ㄹㄹㄹ", "ㅎㅎㅎ", "ㅌㅌㅌ"]
  //
};

//
function loadMembers() {
  const teamSelect = document.getElementById('teamSelect');
  const myNameSelect = document.getElementById('myName');
  const scoreInputs = document.getElementById('scoreInputs');

  const selectedTeam = teamSelect.value;

  myNameSelect.innerHTML = '<option value="">-- 이름 선택 --</option>';
  myNameSelect.disabled = true;
  scoreInputs.innerHTML = '';

  if (!selectedTeam) return;

  teams[selectedTeam].forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    myNameSelect.appendChild(option);
  });

  myNameSelect.disabled = false;
}

//
function loadTeammates() {
  const myName = document.getElementById('myName').value;
  const selectedTeam = document.getElementById('teamSelect').value;
  const container = document.getElementById('scoreInputs');

  container.innerHTML = '';
  if (!myName) return;

  //
  const teammates = teams[selectedTeam].filter(name => name !== myName);

  teammates.forEach(teammate => {
    const div = document.createElement('div');
    div.className = 'member-score';

    const label = document.createElement('label');
    label.textContent = teammate + ': ';

    const input = document.createElement('input');
    input.type = 'number';
    input.min = 0;
    input.max = 100;
    input.name = teammate;
    input.required = true;

    div.appendChild(label);
    div.appendChild(input);
    container.appendChild(div);
  });
}

// 
function submitScores() {
  const team = document.getElementById('teamSelect').value;
  const myName = document.getElementById('myName').value;
  if (!team) {
    alert('조');
    return;
  }
  if (!myName) {
    alert('이름');
    return;
  }

  const inputs = document.querySelectorAll('#scoreInputs input');
  let scores = {};
  for (let input of inputs) {
    if (!input.value) {
      alert('기여도 점수');
      return;
    }
    scores[input.name] = Number(input.value);
  }

  // fetch 사용 시 URL 수정 필요
  fetch('https://script.google.com/macros/s/네_웹앱_배포_URL/exec', {
    method: 'POST',
    body: JSON.stringify({ team: team, name: myName, scores: scores }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.text())
  .then(text => alert(text))
  .catch(err => alert('전송 오류: ' + err));
}
