import '../../sass/pages/calculator/calculator.scss'
import '../../sass/vendor/fonts.scss'
import { addCrossDownHandling } from '../popup'

import { handleCalcButtonClick } from './calculate-button-handling'
import { handlePackageTypeRadioButtonChange } from './change-package-type'
import { citiesDatalist } from './cities-datalist'
import { handleNewPlaceButtonClick } from './create-new-place-block'
import { handleDeletePlaceButtonClick } from './delete-place-block'
import { addPopupOpening } from './volume-weight-popup'

citiesDatalist()

handlePackageTypeRadioButtonChange()
handleCalcButtonClick()
handleNewPlaceButtonClick()
handleDeletePlaceButtonClick()

addPopupOpening()
addCrossDownHandling()