import tableDataUploading from "./order-table-data-uploading"
import sendingEditPopupForm from "./order-table-edit-popup-sending"
import newItemPopupScript from "./order-new-item-popup"

const orderTableScript = () => {
    newItemPopupScript()
    tableDataUploading()
    sendingEditPopupForm()
}

export default orderTableScript