import { editDatalistChangeHandling } from "./edit/datalist-changing"
import sendingEditPopupForm from "./edit/order-table-edit-popup-sending"
import newItemPopupScript from "./new/order-new-item-popup"
import { tableDataUploading } from "./order-table-data-uploading"

export const orderTableScript = () => {
    newItemPopupScript()
    tableDataUploading()
    sendingEditPopupForm()
    editDatalistChangeHandling()
}