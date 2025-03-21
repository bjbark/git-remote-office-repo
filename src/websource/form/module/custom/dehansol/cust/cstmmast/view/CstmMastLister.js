Ext.define('module.custom.dehansol.cust.cstmmast.view.CstmMastLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-cstmmast-lister',
	store		: 'module.custom.dehansol.cust.cstmmast.store.CstmMast',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style'},
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , cls: 'button-style'},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
					'-',
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style'}
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'cstm_idcd'			, width:  80, align : 'left' ,	text: Language.get( 'cstm_idcd'		, '거래처ID'		), hidden : true
					},{	dataIndex:	'cstm_code'			, width:  80, align : 'center',	text: Language.get( 'cstm_code'		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'			, width: 150, align : 'left',	text: Language.get( 'cstm_name'		, '거래처명'		)
					},{	dataIndex:	'mngt_bzpl_idcd'	, width:  80, align : 'left',	text: Language.get( 'mngt_bzpl_idcd', '관리사업장'	), hidden : true
//					},{	dataIndex:	'cstm_stnm_1fst'	, width: 100, align : 'left',	text: Language.get( 'cstm_stnm_1fst', '약칭'			)
					},{	dataIndex:	'cstm_stnm_2snd'	, width: 100, align : 'left',	text: Language.get( 'cstm_stnm_2snd', '약칭2'		), hidden : true
					},{	dataIndex:	'engl_name'			, width: 180, align : 'left',	text: Language.get( 'engl_name'		, '영문명'		)
//					},{	dataIndex:	'engl_stnm'			, width: 120, align : 'left',	text: Language.get( 'engl_stnm'		, '영문약칭'		)
					},{	dataIndex:	'lcls_name'			, width:  80, align : 'left',	text: Language.get( 'lcls_name'		, '대분류'		)
					},{	dataIndex:	'mcls_name'			, width:  80, align : 'left',	text: Language.get( 'mcls_name'		, '중분류'		)
					},{	dataIndex:	'scls_name'			, width:  80, align : 'left',	text: Language.get( 'scls_name'		, '소분류'		)
					},{	dataIndex:	'mngt_bzpl_name'	, width: 120, align : 'left',	text: Language.get( 'mngt_bzpl_name', '관리사업장명'	), hidden : _global.hq_id =='N1000hntop'
					},{	dataIndex:	'file_name'			, width: 100, align : 'center',	text: Language.get( ''				, '사업자등록증'	),
						renderer:function(val,meta,record){
							var title = val;
							if(record.get('file_ttle')!='' && record.get('file_ttle')!=undefined){
								title = record.get('file_ttle');
							}
							return '<a>'+title+'</a>';;
						},
						listeners:{
							click : function(view,el,pos){
								var record = view.getStore().getAt(pos);
								Ext.Ajax.request({
									url		: _global.location.http() + '/upload/set/fileDownload.do',
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
											var url = './resource/downloadFile/'+record.get('file_name');
											window.open(url,'down','width=1400,height=800');
										}
									},
									failure : function(result, request) {
										Ext.Msg.error(result.mesage);
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
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
							}
						}
					},{	dataIndex:	'mail_addr'			, width: 180, align : 'left',	text: Language.get( 'mail_addr'		, '이메일주소'	)
					},{	dataIndex:	'corp_dvcd'			, width:  80, align : 'center',	text: Language.get( 'corp_dvcd'		, '법인구분'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'corp_dvcd' )
					},{	dataIndex:	'tele_numb_2snd'	, width:  80, align : 'left',	text: Language.get( 'tele_numb_2snd', '전화번호2'		), hidden : true					},{	dataIndex:	'faxi_numb'			, width: 100, align : 'left',	text: Language.get( 'faxi_numb'		, '팩스번호'		)
					},{	dataIndex:	'home_page_addr'	, width: 220, align : 'left',	text: Language.get( 'home_page_addr', '홈페이지주소'	), hidden : true
					},{	dataIndex:	'buss_numb'			, width: 100, align : 'left',	text: Language.get( 'buss_numb'		, '사업자등록번호')
					},{	dataIndex:	'corp_numb'			, width:  80, align : 'left',	text: Language.get( 'corp_numb'		, '법인번호'		), hidden : true
					},{	dataIndex:	'boss_name'			, width:  80, align : 'left',	text: Language.get( 'boss_name'		, '대표자명'		)
					},{	dataIndex:	'tele_numb'			, width: 110, align : 'left',	text: Language.get( 'tele_numb'		, '전화번호'		)
					},{	dataIndex:	'spec_buss_nmbr'	, width:  80, align : 'left',	text: Language.get( 'spec_buss_nmbr', '종사업자등록번호'), hidden : true
					},{	dataIndex:	'post_code'			, width:  60, align : 'center',	text: Language.get( 'post_code'		, '우편번호'		)
					},{	dataIndex:	'addr_1fst'			, width: 200, align : 'left',	text: Language.get( 'addr_1fst'		, '주소'			)
					},{	dataIndex:	'addr_2snd'			, width: 150, align : 'left',	text: Language.get( 'addr_2snd'		, '상세주소'		)
					},{	dataIndex:	'buss_type'			, width: 100, align : 'left',	text: Language.get( 'buss_type'		, '업태'			)
					},{	dataIndex:	'buss_kind'			, width: 170, align : 'left',	text: Language.get( 'buss_kind'		, '업종'			)
					},{	dataIndex:	'sale_cstm_yorn'	, width:  60, align : 'center',	text: Language.get( 'sale_cstm_yorn', '매출'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'puch_cstm_yorn'	, width:  60, align : 'center',	text: Language.get( 'puch_cstm_yorn', '매입'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'otod_cstm_yorn'	, width:  60, align : 'center',	text: Language.get( 'otod_cstm_yorn', '외주'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'etcc_cstm_yorn'	, width:  60, align : 'center',	text: Language.get( 'etcc_cstm_yorn', '기타'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'rpst_cstm_idcd'	, width: 100, align : 'left',	text: Language.get( 'rpst_cstm_idcd', '대표거래처ID'	), hidden: true
					},{	dataIndex:	'sale_drtr_name'	, width:  80, align : 'left',	text: Language.get( 'sale_drtr_name', '영업담당자'	)
					},{	dataIndex:	'sale_dept_name'	, width:  80, align : 'left',	text: Language.get( 'sale_dept_name', '영업부서'		)
					},{	dataIndex:	'updt_dttm'			, width: 125, align : 'left',	text: Language.get( 'updt_dttm'		, '수정일시'		)
					},{	dataIndex:	'crte_dttm'			, width: 125, align : 'left',	text: Language.get( 'crte_dttm'		, '생성일시'		)
					},{	dataIndex:	'favo_numb'			, width:  60, align : 'center',	text: Language.get( ''				, '즐겨찾기'		)
					},{	dataIndex:	'acpt_typl_char'	, width:  60, align : 'center',	text: Language.get( 'acpt_typl_char', '주문인식'		), hidden: _global.options.mes_system_type !='Frame',
					}
				]
			};
		return item;
	}
 });