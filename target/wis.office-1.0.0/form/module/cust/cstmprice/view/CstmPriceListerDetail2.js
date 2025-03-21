Ext.define('module.cust.cstmprice.view.CstmPriceListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cstmprice-lister-detail2'			,
	store		: 'module.cust.cstmprice.store.CstmPriceDetail'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	columnLines : true,
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
//		me.dockedItems = [{xtype: 'module-cstmprice-worker-search'}];
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
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style', itemId : 'sale' },
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
					{		xtype: 'rownumberer'	, width:  40, align : 'center'	,text: '항번'
					},{	dataIndex:	'item_clss_bacd_name', width: 200, align : 'left'	, text: Language.get( 'item_clss_bacd_name'	, '품목군'	), hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					},{	dataIndex: 'item_name'		, width: 160, align : 'center'	, text: Language.get('item_name'	, '품명'	)
					},{	dataIndex: 'cstm_name'		, width: 100, align : 'center'	, text: Language.get('cstm_name'	, '거래처명'	), hidden : true
					},{	dataIndex: 'cstm_idcd'		, width: 100, align : 'center'	, text: Language.get(''	, '거래처id'	), hidden : true
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '품명 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-item-popup',
										params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
										result	: function(records) {
											var	parent = records[0];
											record.set('item_idcd',parent.data.item_idcd);
											record.set('item_name',parent.data.item_name);
											record.set('item_spec',parent.data.item_spec);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:  'item_spec'		, width: 100, align : 'center'	, text: Language.get(''	, '규격'	),
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
							editable	: false
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
					},{	dataIndex:	'pric_dvcd', width:  80, align : 'left'		, text: Language.get('pric_dvcd', '단가구분'), xtype: 'lookupcolumn',lookupValue : resource.lookup('pric_dvcd')
						, tdCls	: 'editingcolumn'
						, editor	: {
							xtype		:'lookupfield',
							lookupValue : resource.lookup('pric_dvcd'),
							selectOnFocus: true,
							allowBlank	: false,
							listeners	: {
								render	: function(){
									var arr = [];
									Ext.each(resource.lookup('pric_dvcd'), function(record){
										if(record[0].substr(0,1)=="1"){
											arr.push(record)
										}
									})
									this.setLookupValue(arr);
								}
							}
						}
					},{	dataIndex:	'cont_pric', width:  80, align : 'right'	, text: Language.get('cont_pric', '계약단가'), xtype: 'numericcolumn'
						, tdCls	: 'editingcolumn'
						, editor		: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
						},
					},{	dataIndex:	'deli_dcnt', width:  80, align : 'right'	, text: Language.get('deli_dcnt', '납기일수'), xtype: 'numericcolumn'
						, tdCls	: 'editingcolumn'
						, editor		: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
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
							allowBlank	: false,
							editable	: false,
						},
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
			myform		= Ext.ComponentQuery.query('module-cstmprice-lister-detail2')[0],
			master		= Ext.ComponentQuery.query('module-cstmprice-lister')[0],
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			item_idcd	= '',
			cstm_idcd	= '',
			cstm_name	= '',
			select		= master.getSelectionModel().getSelection()[0],
			lastidx		= store.count()
		;
		if(select){
			max_seq = 0;
			item_idcd = select.get('item_idcd');
			cstm_idcd = select.get('cstm_idcd');
			cstm_name = select.get('cstm_name');

			store.each(function(findrecord) {
				if (findrecord.get('line_seqn') > max_seq) {
					max_seq	= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
				}
			});
			max_seq = max_seq + 1;

			record = Ext.create( store.model.modelName , {
				item_idcd	: item_idcd,		//품목ID
				cstm_idcd	: cstm_idcd,		//거래처ID
				cstm_name	: cstm_name,		//거래처명
				line_seqn	: max_seq,			//순번
				modify		: 'Y',				//수정유무
				cont_date	: new Date(),
				pric_dvcd	: '',
				cont_pric	: '',
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
		var myform	= Ext.ComponentQuery.query('module-cstmprice-lister-detail2')[0],
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