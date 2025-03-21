Ext.define('lookup.popup.membership.model.PntStorPopup',{ extend:'Axt.data.Model',
	fields: [
 		{	name: 'stor_id'             , type: 'string'   /*  매장아이디               */ , defaultValue: _global.stor_id
 		},{	name: 'ctrl_id'             , type: 'string'   /*  아이디                     */
 		},{	name: 'hq_id'               , type: 'string'   /*  본사아이디               */ , defaultValue: _global.hq_id
 		},{	name: 'stor_grp'            , type: 'string'   /*  매장그룹                  */ , defaultValue: _global.stor_grp
 		},{	name: 'stor_nm'             , type: 'string'   /*  매장명                     */
 		},{	name: 'stor_gb'             , type: 'string'   /*  매장구분                  */
 		},{	name: 'stor_sts'            , type: 'string'   /*  매장상태(진행)          */
 		},{	name: 'stor_st_tm'          , type: 'string'   /*  매장시작시간            */
 		},{	name: 'stor_end_tm'         , type: 'string'   /*  매장종료시간            */
 		},{	name: 'stor_st_tm_sat'      , type: 'string'   /*  매장시작시간토요일   */
 		},{	name: 'stor_end_tm_sat'     , type: 'string'   /*  매장종료시간토요일   */
 		},{	name: 'stor_st_tm_sun'      , type: 'string'   /*  매장시작시간일요일   */
 		},{	name: 'stor_end_tm_sun'     , type: 'string'   /*  매장종료시간일요일   */
 		},{	name: 'biz_gb'              , type: 'string'   /*  사업구분                  */
 		},{	name: 'biz_no'              , type: 'string'   /*  사업자-주민-등록번호 */
 		},{	name: 'biz_nm'              , type: 'string'   /*  사업명                     */
 		},{	name: 'biz_type'            , type: 'string'   /*  업태                        */
 		},{	name: 'biz_kind'            , type: 'string'   /*  업종                        */
 		},{	name: 'biz_owner'           , type: 'string'   /*  사업장 대표자           */
 		},{	name: 'biz_email'           , type: 'string'   /*  사업이메일               */
 		},{	name: 'biz_tel_no'          , type: 'string'   /*  사업전화번호            */
 		},{	name: 'biz_hp_no'           , type: 'string'   /*  사업휴대폰번호         */
 		},{	name: 'biz_fax_no'          , type: 'string'   /*  사업팩스번호            */
 		},{	name: 'biz_zip_cd'          , type: 'string'   /*  사업장우편번호         */
 		},{	name: 'biz_addr_1'          , type: 'string'   /*  사업주소1                 */
 		},{	name: 'biz_addr_2'          , type: 'string'   /*  사업주소2                 */
 		},{	name: 'biz_state'           , type: 'string'   /*  사업주소_시도           */
 		},{	name: 'biz_city'            , type: 'string'   /*  사업주소_군구           */
 		},{	name: 'biz_dong'            , type: 'string'   /*  사업주소_읍면동        */
 		},{	name: 'zip_cd'              , type: 'string'   /*  코드                        */ , convert : Ext.util.Format.StrToZip , serialize: Ext.util.Format.ZipToStr
 		},{	name: 'state'               , type: 'string'   /*  주소_시도                 */
 		},{	name: 'city'                , type: 'string'   /*  주소_군구                 */
 		},{	name: 'dong'                , type: 'string'   /*  주소_읍면동              */
 		},{	name: 'addr_1'              , type: 'string'   /*  주소1                       */
 		},{	name: 'addr_2'              , type: 'string'   /*  주소2                       */
 		},{	name: 'map_img'             , type: 'string'   /*  지도이미지               */
 		},{	name: 'map_url'             , type: 'string'   /*  지도URL                     */
 		},{	name: 'map_vw'              , type: 'string'   /*  지도뷰                     */
 		},{	name: 'map_zone'            , type: 'string'   /*  지도구역                  */
 		},{	name: 'map_area'            , type: 'string'   /*  지도면적                  */
 		},{	name: 'bnkbk_id'            , type: 'string'   /*  계좌ID                      */
 		},{	name: 'pnt_type'            , type: 'string'   /*  포인트타입               */
 		},{	name: 'pnt_rt'              , type: 'float'   /*  포인트율                  */ , defaultValue : 0
 		},{	name: 'min_use_pnt'         , type: 'float'   /*  최소사용포인트         */ , defaultValue : 0
 		},{	name: 'cash_pnt_rt'         , type: 'float'   /*  현금포인트율            */ , defaultValue : 0
 		},{	name: 'card_pnt_rt'         , type: 'float'   /*  카드포인트율            */ , defaultValue : 0
 		},{	name: 'stamp_url'           , type: 'string'   /*  인감URL                     */
 		},{	name: 'bizarea_pht'         , type: 'string'   /*  사업장사진               */
 		},{	name: 'mst_img'             , type: 'string'   /*  대표이미지               */
 		}
 	]
});
