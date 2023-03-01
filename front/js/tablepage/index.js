import '../../sass/pages/tablepage/tablepage.scss'
import '../../sass/vendor/fonts.scss'
import { newShipmentPopupScript } from '../new-shipment-popup/new-shipment-popup';

import { enableSelectingAllInputs, selectAllInputs } from "./select-all-inputs";
import { uploadData } from "./uploading-table-data";

newShipmentPopupScript()
enableSelectingAllInputs()
uploadData()