import '../../sass/pages/typespage/typespage.scss'
import '../../sass/vendor/fonts.scss'

import { typesPageTableDataUploading } from './types-uploading'
import { typespageNewTypePopup } from './new-item/new-item-popup'
import { selectAllTableRows } from './select-all-inputs'
import { addHandlingTypeLinkPress } from './edit-item/add-handling-type-link-press'
import { handleSaveButtonClick } from './edit-item/handle-save-button-click'


typesPageTableDataUploading()
typespageNewTypePopup()

selectAllTableRows()

addHandlingTypeLinkPress()
handleSaveButtonClick()
