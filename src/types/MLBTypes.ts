export interface MLBGame {
  away_id: number;
  away_name: string;
  away_score: number;
  away_pitcher_note: string;
  away_probable_pitcher: string;
  current_inning: number;
  doueble_header: string;
  game_date: string;
  game_datetime: string;
  game_id: number;
  game_type: string;
  home_id: number;
  home_name: string;
  home_pitcher_note: string;
  home_probable_pitcher: string;
  home_score: number;
  inning_state: string;
  status: string;
  summary: string;
}