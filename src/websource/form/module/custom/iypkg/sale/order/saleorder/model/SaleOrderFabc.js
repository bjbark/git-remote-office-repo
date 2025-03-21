Ext.define('module.custom.iypkg.sale.order.saleorder.model.SaleOrderFabc', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* 수주번호		*/
		},{	name: 'line_seqn'			, type: 'float ' 	/* 순번			*/
		},{	name: 'item_idcd'			, type: 'string'	/* 원단ID		*/
		},{	name: 'prod_name'			, type: 'string'	/* 원단ID		*/
		},{	name: 'prod_code'			, type: 'string'	/* 원단ID		*/
		},{	name: 'fabc_idcd'			, type: 'string'	/* 원단ID		*/
		},{	name: 'ppln_dvcd'			, type: 'string'	/* 지골구분코드	*/
		},{	name: 'item_ttln'			, type: 'float ' , defaultValue:0	/* 품목총장		*/, defaultValue : 0
		},{	name: 'item_ttwd'			, type: 'float ' , defaultValue:0	/* 품목총폭		*/, defaultValue : 0
		},{	name: 'item_leng'			, type: 'float ' , defaultValue:0	/* 품목길이		*/, defaultValue : 0
		},{	name: 'item_widh'			, type: 'float ' , defaultValue:0	/* 품목폭		*/, defaultValue : 0
		},{	name: 'item_fxqt'			, type: 'string ' , defaultValue:0	/* 품목절수		*/, defaultValue : 0
		},{	name: 'mxm2_qntt'			, type: 'float ' , defaultValue:0	/* 제곱미터수량	*/, defaultValue : 0
		},{	name: 'mxm2_pric'			, type: 'float ' , defaultValue:0	/* 제곱미터단가	*/, defaultValue : 0
		},{	name: 'pqty_pric'			, type: 'float ' , defaultValue:0	/* 개당단가		*/, defaultValue : 0
		},{	name: 'offr_yorn'			, type: 'string' 	/* 발주여부		*/
		},{	name: 'offr_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	/* 발주일자		*/
		},{	name: 'offr_numb'			, type: 'string' 	/* 발주번호		*/
		},{	name: 'cstm_idcd'			, type: 'string' 	/* 거래처ID		*/
		},{	name: 'istt_yorn'			, type: 'string' 	/* 입고여부		*/
		},{	name: 'istt_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	/* 입고일자		*/
		},{	name: 'istt_qntt'			, type: 'float ' , defaultValue:0	/* 입고수량		*/
		},{	name: 'need_qntt'			, type: 'float ' , defaultValue:0	/* 소요수량		*/
		},{	name: 'fabc_name'			, type: 'string' 	/* 원단명		*/
		},{	name: 'cstm_name'			, type: 'string' 	/* 거래처명		*/
		},{	name: 'fdat_spec'			, type: 'string' 	/* 제단규격		*/
		},{	name: 'length'				, type: 'float' 	/* 절단폭		*/


		},{	name: 'uper_seqn'			, type: 'float' 	/* 상위순번 */
		},{	name: 'disp_seqn'			, type: 'float' 	/* 하위순번 */
		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모 */
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모 */
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID */
		},{	name: 'line_levl'			, type: 'float' , defaultValue : 0	/* ROW레벨 */
		},{	name: 'line_ordr'			, type: 'float' , defaultValue : 0	/* ROW순서 */
		},{	name: 'line_stat'			, type: 'string', defaultValue : '0'/* ROW상태 */
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감 */
		},{	name: 'updt_user_name'		, type: 'string'	/* 수정사용자명 */
		},{	name: 'updt_ipad'			, type: 'string'	/* 수정IP */
		},{	name: 'updt_dttm'			, type: 'string', convert : Ext.util.Format.strToDateTime 	/* 수정일시 */
		},{	name: 'updt_idcd'			, type: 'string', defaultValue : _global.login_pk				/* 수정ID */
		},{	name: 'updt_urif'			, type: 'string'	/* 수정UI */
		},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명 */
		},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP */
		},{	name: 'crte_dttm'			, type: 'string', convert : Ext.util.Format.strToDateTime	/* 생성일시 */
		},{	name: 'crte_idcd'			, type: 'string', defaultValue : _global.login_pk				/* 생성ID */
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI */
		}
	]
});

