import {SongData} from './song-data.model';
import {SongOption} from './song-option';

export interface SongResponse {
  status: boolean;
  data?: Array<SongData>;
  additional_data?: SongOption;
}
