Ext.define('module.custom.kortc.qc.chge.chgemast.view.ChgeMastLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-chgemast-lister',
	store		: 'module.custom.kortc.qc.chge.chgemast.store.ChgeMastLister',

	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins     : [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }, { ptype:'filterbar'},{
        ptype: 'bufferedrenderer',         // 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    }],

	viewConfig: {
		markDirty: false,
		loadMask : false,
		enableTextSelection: true
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					{   xtype   : 'button',
					    iconCls : 'filterIcon',
					    toggleGroup:'saleosttlist',
					    listeners:{
					       toggle:function(toggle){
					          var filter = me.filterBar;
					             filter.setVisible(toggle.pressed);
					       }
					    }
					},
				    '->',
				    {text : '<span class="write-button">4M 변경 의뢰서</span>'	, action : 'filePopup'      	, cls: 'button1-style',itemId: 'fileBtn', hidden: true, width: 100 },
					'-', '->', '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon	, action : Const.INSERT.action	, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon	, action : Const.MODIFY.action	, cls: 'button-style', itemId: 'modiBtn', hidden: true } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon	, action : Const.DELETE.action	, cls: 'button-style', itemId: 'deleBtn', hidden: true } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon	, action : Const.EXPORT.action	, cls: 'button-style' } ,

				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
				    /*{	dataIndex:	''				, width: 30	, align: 'center'	, text: Language.get( ''		, 'No'		)*/
				    {	xtype  	 :  'rownumberer'   , width : 40, align: 'center'   , text: 'NO'   						, hidden : true,
				    },{	dataIndex:	'rcpt_date'		, width: 90	, align: 'center'	, text: Language.get( 'rcpt_date'	, '접수일자'	)
				    },{	dataIndex:	'cstm_name'		, width: 100, align: 'left'		, text: Language.get( 'cstm_name'	, '거래처명'	)
				    },{	dataIndex:	'item_code'		, width: 250, align: 'center'	, text: Language.get( 'item_code'	, '품목코드'	)
				    },{	dataIndex:	'crty_bacd'		, width: 90	, align: 'center'	, text: Language.get( 'crty_bacd'	, '차종'		)
				    },{	dataIndex:	'item_name'		, width: 130, align: 'left'		, text: Language.get( 'item_name'	, '품명'		)
					},{	dataIndex:	''				, align : 'center'	,	text: Language.get(''		, '4M 구분'	),
						columns: [
						    {	dataIndex: '4mdv_1fst'	, text: Language.get('4mdv_1fst', '사람')	, align: 'center'	, width: 40, xtype: 'lookupcolumn', lookupValue: resource.lookup('chck')
							},{	dataIndex: '4mdv_2snd'	, text: Language.get('4mdv_2snd', '재료')	, align: 'center'	, width: 40, xtype: 'lookupcolumn', lookupValue: resource.lookup('chck')
							},{	dataIndex: '4mdv_3trd'	, text: Language.get('4mdv_3trd', '기계')	, align: 'center'	, width: 40, xtype: 'lookupcolumn', lookupValue: resource.lookup('chck')
							},{	dataIndex: '4mdv_4frt'	, text: Language.get('4mdv_4frt', '방법')	, align: 'center'	, width: 40, xtype: 'lookupcolumn', lookupValue: resource.lookup('chck')
							},{	dataIndex: 'chck_yorn'	, text: Language.get('chck_yorn', '')	, align: 'center'	, width: 40, hidden: true
							}
						]
					//},{	dataIndex:	'istt_qntt'		, width: 80	, align : 'right'	, text: Language.get( ''		, '입고수량'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 	'chge_resn'		, width: 180, align: 'center'	, text: Language.get( 'chge_resn'	, '변경사유')
					},{	dataIndex:	''				, align: 'center'	,	text: Language.get(''		, '4M 변경 의뢰서'),
						columns: [
						    {	dataIndex: 'upld_dttm'	, text: Language.get('', '제출/승인')	, align: 'center'	, width: 90
						    },{	dataIndex: 'file_naem'	, text: Language.get('', '파일명')		, align: 'center'	, width: 70	,	hidden: true
							},{	dataIndex: 'assi_seqn'	, text: Language.get('', '바로가기')	, align: 'center'	, width: 70	,
								renderer:function(val){
									if(val==1){
										return val='<button style="color:#2E64FE; font-size:15px; border:none; background-color:transparent; ">▶</button>';
									}
								},
								listeners:{
									mouseover:function(view, el){
									},
									click : function(view, el, pos){
										if(view.getStore().getAt(pos).data.assi_seqn == 1){
											var record = view.getStore().getAt(pos);
											Ext.Ajax.request({
												url		: _global.location.http() + '/upload/set/fileDownload.do',
												params	: {
													token	: _global.token_id,
													param	: JSON.stringify({
														stor_id		: _global.stor_id,
														hqof_idcd	: _global.hqof_idcd,
														file_name	: record.get('file_name')
													})
												},
												async	: false,
												method	: 'POST',
												success	: function(response, request){
													var result = Ext.decode(response.responseText);
													if(!result.success){
														Ext.Msg.error(result.message);
														return;
													}else{
														var url = './resource/downloadFile/' + record.get('file_name');
														window.open(url, 'down', 'width=1400, height=800');
													}
												},
												failure	: function(result, request){
													Ext.Msg.error(result.message);
												},
												callback: function(operation){
												}
											});
											setTimeout(function(){
												Ext.Ajax.request({
													url		: _global.location.http() + '/upload/set/localDelete.do',
													params	: {
														token : _global.token_id,
														param : JSON.stringify({
															stor_id			: _global.stor_id,
															hqof_idcd		: _global.hqof_idcd,
															file_name		: record.get('file_name'),
														})
													},
													async	: false,
													method	: 'POST',
													success	: function(response, request) {
														var result = Ext.decode(response.responseText);
														if	(!result.success ){
															Ext.Msg.error(result.message );
															return;
														} else {
															console.log(result);
														}
													},
													failure : function(result, request) {
														Ext.Msg.error(result.mesage);
													},
													callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
													}
												})
											},60000);
										}else{
											return;
										}
									}// click
								}
							}
						]
					},{	dataIndex:	''				, align: 'center'	,	text: Language.get(''		, 'ISIR'),
						columns: [
						    {	dataIndex: 'isir_sbmt_date'	, text: Language.get('isir_sbmt_date', '제출일자')	, align: 'center'	, width: 80
							},{	dataIndex: 'isir_apvl_date'	, text: Language.get('isir_apvl_date', '승인일자')	, align: 'center'	, width: 80
							}
						]
					},{	dataIndex:	''				, align: 'center'	,	text: Language.get(''		, '초도품'),
						columns: [
						    {	dataIndex: 'fart_adpt_date'	, text: Language.get('fart_adpt_date', '적용일자')	, align: 'center'	, width: 80
							},{	dataIndex: 'fart_dlvy_date'	, text: Language.get('fart_dlvy_date', '납품일자')	, align: 'center'	, width: 80
							},{	dataIndex: 'fart_prod_lott'	, text: Language.get('fart_prod_lott', '생산LOT')	, align: 'center'	, width: 80
							}
						]
					},{	dataIndex:	''				, align: 'center'	,	text: Language.get(''		, '초기유동관리'),
						columns: [
						    {	dataIndex: 'mvfr_lott_1fst'	, text: Language.get('mvfr_lott_1fst', '1LOT')	, align: 'center'	, width: 40, xtype: 'lookupcolumn', lookupValue: resource.lookup('chck')
							},{	dataIndex: 'mvfr_lott_2snd'	, text: Language.get('mvfr_lott_2snd', '2LOT')	, align: 'center'	, width: 40, xtype: 'lookupcolumn', lookupValue: resource.lookup('chck')
							},{	dataIndex: 'mvfr_lott_3trd'	, text: Language.get('mvfr_lott_3trd', '3LOT')	, align: 'center'	, width: 40, xtype: 'lookupcolumn', lookupValue: resource.lookup('chck')
							}
						]
					},{	dataIndex:	''				, align: 'center'	,	text: Language.get(''		, '유효성 확인<br>●:합격 ○:불합격'),
						columns: [
						    {	dataIndex: 'chek_yorn_1fst'	, text: Language.get('chek_yorn_1fst', '1개월')	, align: 'center'	, width: 43, xtype: 'lookupcolumn', lookupValue: resource.lookup('chck')
						    },{	dataIndex: 'chek_yorn_2snd'	, text: Language.get('chek_yorn_2snd', '2개월')	, align: 'center'	, width: 43, xtype: 'lookupcolumn', lookupValue: resource.lookup('chck')
							},{	dataIndex: 'chek_yorn_3trd'	, text: Language.get('chek_yorn_3trd', '3개월')	, align: 'center'	, width: 43, xtype: 'lookupcolumn', lookupValue: resource.lookup('chck')
							}
						]
					},{	dataIndex:	'remk_text'		, width: 200, align: 'left'	, text: Language.get( 'remk_text'	, '비고'		)
					}
				]
			};
		return item;
	}
 });