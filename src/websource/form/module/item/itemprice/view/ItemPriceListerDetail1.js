Ext.define('module.item.itemprice.view.ItemPriceListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemprice-lister-detail1'			,
	store		: 'module.item.itemprice.store.ItemPriceDetail'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	columnLines : true,
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style',
						handler: me.rowInsert
					},
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style',
						handler: me.rowDelete
					},
					'-', '-' ,
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style', itemId : 'purc' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'cstm_name'		, width: 160, align : 'center'	, text: Language.get('cstm'	, '구매거래처'	)
					},{	dataIndex: 'acct_bacd'		, width: 160, align : 'center'	, text: Language.get('acct_bacd'	, '계정구분'	),hidden : true
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '거래처 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup',
										params	: { stor_grp : _global.stor_grp, line_stat : '0',puch_cstm_yorn : '1' },
										result	: function(records) {
											var	parent = records[0];
											console.log(parent);
											record.set('cstm_idcd',parent.data.cstm_idcd);
											record.set('cstm_name',parent.data.cstm_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex : 'cont_date'		, width:  95, text: Language.get('cont_date'	,	'계약일자'	) , align: 'center',
						tdCls : 'editingcolumn',
						renderer:function(val){
							var ymd;
							date = Ext.util.Format.strToDate(val);
							date2 = new Date(val);
							if(date2 == 'Invalid Date'){
								ymd = date;
							}else{
								ymd = Ext.Date.format(date2,'Y-m-d');
							}
							return ymd;
						},
						editor		: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							editable	: false,
						},
					},{	dataIndex: 'drtr_name'		, width: 100, align : 'center'	, text: Language.get('drtr'	, '담당자'	)
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '담당자 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-user-popup',
										params	: { stor_grp : _global.stor_grp, line_stat : '0',puch_cstm_yorn : '1' },
										result	: function(records) {
											var	parent = records[0];
											record.set('drtr_idcd',parent.data.user_idcd);
											record.set('drtr_name',parent.data.user_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'cont_pric', width:  80, align : 'right'	, text: Language.get('cont_pric', '계약단가'), xtype: 'numericcolumn'
						, tdCls	: 'editingcolumn'
						, editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						}
						,listeners:{
							change:function(){
								this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{	dataIndex:	'pric_dvcd', width:  80, align : 'right'	, text: Language.get('pric_dvcd', '계약단가'), hidden:true
						, value : '3000'
					},{	dataIndex:	'deli_dcnt', width:  80, align : 'right'	, text: Language.get('deli_dcnt', '납기일수'), xtype: 'numericcolumn'
						, tdCls	: 'editingcolumn'
						, editor		: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						},
					},{	dataIndex : 'trmn_date'		, width:  95, text: Language.get('trmn_date'	,	'해지일자'	) , align: 'center'
						, tdCls : 'editingcolumn'
						, renderer:function(val){
							var ymd;
							date = Ext.util.Format.strToDate(val);
							date2 = new Date(val);
							if(date2 == 'Invalid Date'){
								ymd = date;
							}else{
								ymd = Ext.Date.format(date2,'Y-m-d');
							}
							return ymd;
						}
						, editor		: {
							xtype		:'datefield',
							selectOnFocus: true,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							allowBlank	: false
						},
					},{	dataIndex:	'last_yorn', width:  60, align : 'center'	, text: Language.get('last_yorn', '최종여부'), xtype: 'lookupcolumn' ,lookupValue : resource.lookup('yorn'),hidden : true
							, tdCls	: 'editingcolumn'
							, editor		: {
								xtype		:'lookupfield',
								lookupValue : resource.lookup('yorn'),
								selectOnFocus: true,
								allowBlank	: false
							}
					}
					,{	dataIndex:	'user_memo', width:  150, align : 'left'	, text: Language.get('user_memo', '비고'),hidden : true
						, tdCls	: 'editingcolumn'
						, editor		: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					}
					,{	dataIndex:	'cstm_drtr_name'		, width: 120, align : 'left'	, text: Language.get( 'cstm_drtr_name'			, '거래처 담당자명'), hidden : _global.hqof_idcd.toUpperCase()!= 'N1000SJUNG',
					}
					,{	dataIndex:	'cstm_drtr_tele_numb'	, width: 120, align : 'left'	, text: Language.get( 'cstm_drtr_tele_numb'		, '전화번호'), hidden : _global.hqof_idcd.toUpperCase()!= 'N1000SJUNG',
					}
					,{	dataIndex:	'cstm_drtr_hdph_numb'	, width: 120, align : 'left'	, text: Language.get( 'cstm_drtr_hdph_numb'		, '휴대전화'), hidden : _global.hqof_idcd.toUpperCase()!= 'N1000SJUNG',
					}
				]
			}
		;
		return item;
	},

	listeners: {

		/*   추가 및 삭제 버튼에 대한 처리 내용을 기술한다....
		 *   삭제할 경우 확인여부를 다시 확인하여 삭제 처리한다.(store에서 Remove)
		 *   추가할 경우 새로운 로우를 생성한 후 기본값들을 set한다......
		 */
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
				target  : me.getEl().dom,
				binding : [
					{	/* Ctrl + Delete */
						ctrl:true, key: 46,
						fn: function(key,e){
							me.rowDelete();
						}
					},{	/* Ctrl + Insert */
						ctrl:true, key: 45,
						fn: function(key,e){
							me.rowInsert();
						}
					}
				]
			});
		},
	},

	/******************************************************************
	 * 추가하기 위해 ROW를 생성하고, Focus를 옮긴다.(Ctrl+ Insert or 행추가 버튼)
	 ******************************************************************/
	rowInsert: function(){
		var me			= this,
			myform		= Ext.ComponentQuery.query('module-itemprice-lister-detail1')[0],
			master		= Ext.ComponentQuery.query('module-itemprice-lister')[0],
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			item_idcd	= '',
			select		= master.getSelectionModel().getSelection()[0],
			lastidx		= store.count()
		;
		if(select){
			max_seq = 0;
			item_idcd = select.get('item_idcd');
			store.each(function(findrecord) {
				if (findrecord.get('line_seqn') > max_seq) {
					max_seq	= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
				}
			});
			max_seq = max_seq + 1;

			record = Ext.create( store.model.modelName , {
				item_idcd	: item_idcd,		//invoice번호
				line_seqn	: max_seq,			//순번
				modify		: 'Y',				//수정유무
				cont_date	: new Date(),
				acct_bacd	: select.get('acct_bacd'),
				pric_dvcd	: '3000'
			});

			// ROW 추가
			store.add(record);
			myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
		}else{
			Ext.Msg.alert('알림','품목을 선택해주세요.');
		}
	},
	/******************************************************************
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var myform	= Ext.ComponentQuery.query('module-itemprice-lister-detail1')[0],
			records = myform.getSelectionModel().getSelection();
		if(records.length == 0){
			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
				fn : function (button) {
					if (button==='yes') {
							myform.getStore().remove (records);
					}
				}
			});
		}
	}
});
