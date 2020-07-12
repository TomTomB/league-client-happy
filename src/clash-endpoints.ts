const basePath = "lol-clash/v1/";
const invitedRosterIds = basePath + "invited-roster-ids";
const allTournaments = basePath + "all-tournaments";
const currentTournamentIds = basePath + "currentTournamentIds";
const roster = basePath + "roster";
const tournament = basePath + "tournament";

export const getRoster = (rosterId: string) => roster + "/" + rosterId;
export const getInvitedRosterIds = invitedRosterIds;
export const getAllTournaments = allTournaments;
export const getCurrentTournamentIds = currentTournamentIds;

export const getTournamentPlayer = (tournamentId: string | number) =>
  tournament + "/" + tournamentId + "/player";

export const postRosterIcon = (rosterId: string) =>
  roster + "/" + rosterId + "/change-icon";

export const postRosterName = (rosterId: string) =>
  roster + "/" + rosterId + "/change-name";

export const postRosterShortName = (rosterId: string) =>
  roster + "/" + rosterId + "/change-short-name";
