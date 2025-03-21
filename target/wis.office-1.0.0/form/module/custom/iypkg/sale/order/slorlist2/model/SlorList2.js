Ext.define( 'module.custom.iypkg.sale.order.slorlist2.model.SlorList2', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'           , type: 'string'	/* 수주번호		*/
		},{	name: 'line_seqn'           , type: 'string'	/* 순번			*/
		},{	name: 'invc_date'           , type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	/* 수주일자		*/
		},{	name: 'deli_date'           , type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	/* 납기일자		*/
		},{	name: 'cstm_name'           , type: 'string'	/* 수주처명		*/
		},{	name: 'dely_cstm_name'      , type: 'string'	/* 발주처명		*/
		},{	name: 'prod_name'           , type: 'string'	/* 품명			*/
		},{	name: 'acpt_qntt'           , type: 'float'		/* 수주수량		*/
		},{	name: 'trst_qntt'           , type: 'float'		/* 의뢰수량		*/
		},{	name: 'ostt_date'           , type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	/* 출고일자		*/
		},{	name: 'prod_spec'           , type: 'string'	/* 상자규격		*/
		},{	name: 'fabc_name'           , type: 'string'	/* 원단명			*/
		},{	name: 'fabc_spec'           , type: 'string'	/* 원단규격		*/
		},{	name: 'ostt_qntt'           , type: 'float'		/* 출고수량		*/
		},{	name: 'offr_qntt'           , type: 'float'		/* 발주수량		*/
		},{	name: 'deff_qntt'           , type: 'float'		/* 미납잔량		*/
		},{	name: 'ppln_dvcd'           , type: 'string'	/* 골			*/
		},{	name: 'item_ttln'           , type: 'float'		/* 총장			*/
		},{	name: 'item_ttwd'           , type: 'float'		/* 총폭			*/
		},{	name: 'item_leng'           , type: 'float'		/* 월장			*/
		},{	name: 'item_widh'           , type: 'float'		/* 월폭			*/
		},{	name: 'item_fxqt'           , type: 'float'		/* 절수*/
		},{	name: 'fdat_spec'           , type: 'string'	/* */
		},{	name: 'stat'                , type: 'string'	/* */
		},{	name: 'rnum'                , type: 'string'	/* */
		}
	]
});
