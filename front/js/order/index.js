import '../../sass/pages/shipment/shipment.scss'
import '../../sass/vendor/fonts.scss'

import orderEditingScript from './order-editing/order-editing'
import { shipmentInfoUploading } from './order-editing/shipment-info-uploading'
import orderInfoPositioning from './order-editing/order-info-positioning'
import { orderTableScript } from './order-table/order-table-script'
import { newShipmentPopupScript } from '../new-shipment-popup/new-shipment-popup'
import { uploadTypesForDataList } from './order-table/datalist'

uploadTypesForDataList()
newShipmentPopupScript()
orderEditingScript()
shipmentInfoUploading()
orderInfoPositioning()
orderTableScript()