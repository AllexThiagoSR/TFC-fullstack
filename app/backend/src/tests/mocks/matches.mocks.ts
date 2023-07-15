const matches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
  }
];

const matchToCreate = {
  "id": 1,
  "homeTeamId": 16,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true,
};

const matchWithEqualTeam = {
  "homeTeamId": 16,
  "awayTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true,
}

export { matches, matchToCreate, matchWithEqualTeam };