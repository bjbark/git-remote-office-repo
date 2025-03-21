Ext.define('module.custom.iypkg.mtrl.purc.npayinit.view.NpayInitLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-npayinit-lister',
	store		: 'module.custom.iypkg.mtrl.purc.npayinit.store.NpayInit',
	border		: 0,
	columnLines	: true,
	features	: [{ ftype : 'grid-summary' }],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
					,'-','->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style', handler: me.rowInsert },
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style', handler: me.rowDelete },
					'-', '-',
					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action , cls: 'button-style'},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me		= this,
			item	=  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'yorn'			, width: 150, align : 'left'		,	text: Language.get( ''		, '거래구분'	)
					},{	dataIndex:	'cstm_code'		, width: 120, align : 'center'		,	text: Language.get( 'cstm_code'		, '거래처코드'	)
					},{	dataIndex:	'cstm_name'		, width: 250, align : 'left'		,	text: Language.get( 'cstm_name'		, '거래처'	)
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '거래처 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									var trns_yymm,
									store = Ext.ComponentQuery.query('module-npayinit-lister')[0].getStore(),
									check = '1'
								;
								if(record.data.trns_yymm.length >0 ){
									trns_yymm = record.data.trns_yymm;
								}
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup2',
										params	: {tema : '', puch_cstm_yorn: '1', trns_yymm : trns_yymm, sale_cstm_yorn : '' },
										result	: function(records) {
											var	parent = records[0];
											if(  record.get('cstm_idcd') != '' && record.get('cstm_idcd') != parent.data.cstm_idcd){
												Ext.Msg.alert("알림","새로운 거래처는 행추가로 새로 등록하여 주시기 바랍니다.");
												check = '0';
											}

											if (parent.data.cstm_idcd != '' && parent.data.cstm_idcd != null){
												store.each(function(findrecord){
													if(findrecord.get('cstm_idcd') == parent.data.cstm_idcd ){
														Ext.Msg.alert("알림","내역에 이미 추가된 거래처 입니다. 내역을 확인하여 주시기 바랍니다.");
														check = '0';
													}
												});
											}
											if(check == '1'){
												record.set('cstm_idcd',parent.data.cstm_idcd);
												record.set('cstm_code',parent.data.cstm_code);
												record.set('cstm_name',parent.data.cstm_name);
												record.set('pper_cstm_yorn',parent.data.pper_cstm_yorn);
												record.set('fabc_cstm_yorn',parent.data.fabc_cstm_yorn);
												record.set('mani_cstm_yorn',parent.data.mani_cstm_yorn);
												record.set('asmt_cstm_yorn',parent.data.asmt_cstm_yorn);
												record.set('otod_cstm_yorn',parent.data.otod_cstm_yorn);
												record.set('gods_cstm_yorn',parent.data.gods_cstm_yorn);
												var string = [];
													if(parent.data.pper_cstm_yorn == '1'){
														string.push("원지");
													}
													if(parent.data.fabc_cstm_yorn == '1'){
														string.push("원단");
													}
													if(parent.data.mani_cstm_yorn == '1'){
														string.push("마니라");
													}
													if(parent.data.asmt_cstm_yorn == '1'){
														string.push("부자재");
													}
													if(parent.data.otod_cstm_yorn == '1'){
														string.push("외주");
													}
													if(parent.data.gods_cstm_yorn == '1'){
														string.push("상품");
													}
												record.set('yorn',string);
											}
										}
									});
								},
								scope : me
							}
						]
					},{	dataIndex:	'trns_bill_amnt'	, width: 120, align : 'right'		,	text: Language.get( 'trns_bill_amnt', '거래명세서기준')
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					},{	dataIndex:	'txbl_amnt'			, width: 120, align : 'right',	text: Language.get( 'txbl_amnt'		, '세금계산서기준')
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					},{	dataIndex:	'remk_text'			, flex : 1 , align : 'left',	text: Language.get( 'remk_text'		, '비고'		)
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					}
				]
			};
		return item;
	},

	// 행추가 및 행삭제
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

	/******************************************************************
	 * 추가하기 위해 ROW를 생성하고, Focus를 옮긴다.(Ctrl+ Insert or 행추가 버튼)
	 ******************************************************************/
	rowInsert: function(){
		var me			= this,
			myform		= Ext.ComponentQuery.query('module-npayinit-lister')[0],
			search		= Ext.ComponentQuery.query('module-npayinit-search')[0],
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			lastidx		= store.count()
		;

		record = Ext.create( store.model.modelName , {
			modify		: 'Y',							//수정유무
			trns_yymm	: search.getValues().trns_yymm	//년월
		});
		// ROW 추가
		store.add(record);
		myform.plugins[0].startEdit(lastidx , 5);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....

	},

	/******************************************************************
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var myform	= Ext.ComponentQuery.query('module-npayinit-lister')[0],
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