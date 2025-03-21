Ext.define('module.workshop.sale.order.estimast.view.EstiMastShetLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workshop-estimast-shetlister'			,
	store		: 'module.workshop.sale.order.estimast.store.EstiMastShetLister',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },

	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
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
					{xtype:'button',text : '<span class ="btnTemp" style="color:green; font-size : 13px;">추 가</span>', iconCls: Const.INSERT.icon,handler: me.rowInsert } ,
					, '-',
					{xtype:'button',text : Const.DELETE.text, iconCls: Const.DELETE.icon, handler: me.rowDelete } , '-',
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'line_seqn'			, width:  60, align : 'center'	, text: Language.get( 'line_seqn'	, '순번'		),hidden : true,
					},{	dataIndex:	'fabc_name'	, width: 200, align : 'left'	, text: Language.get( 'fabc_name'	, '용지명'	),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						name	: 'fname',
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '용지코드',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {

									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-shetitem-popup',
										params:{ stor_grp : _global.stor_grp , line_stat : '0', lcls_idcd : '000048',scls_idcd : '000073',mcls_idcd : '000054'},
										result	: function(records) {
											editor = Ext.ComponentQuery.query('module-workshop-estimast-shetlister')[0];
											console.log(editor);
//											editor.down('[name=fabc_name]').setValue(records[0].get('fabc_name'));
//											editor.down('[name=fabc_idcd]').setValue(records[0].get('fabc_idcd'));
											record.set('fabc_idcd',records[0].data.shet_idcd);
											record.set('fabc_name',records[0].data.shet_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'shet_wght'		, width:  80, align : 'right'	, text: Language.get( 'shet_wght'	, '평량'		),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '평량',
								handler	: function (grid, rowIndex, colIndex, item, e, record, self) {
									editor = Ext.ComponentQuery.query('module-workshop-estimast-shetlister')[0];
									console.log(editor);
									param = editor.down('[name=fname]');
									if(param.fabc_name== '' || param.fabc_idcd == null ){
										Ext.Msg.alert("알림","용지명을 먼저 선택하여 주십시오.");
										return;
										}
										else{
											Ext.merge( self.popup.values , {
												brcd : self.getValue()
											});
										return
										}
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-shetwght-popup',
										params:{ stor_grp : _global.stor_grp , line_stat : '0', },
										result	: function(records) {
											record.set('shet_idcd',records[0].data.shet_idcd);
											record.set('shet_wght',records[0].data.shet_wght);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'prnt_colr_bacd_shet'	, width:  90, align : 'center'	, text: Language.get( 'prnt_colr_name'	, '컬러'	), xtype:'lookupcolumn',lookupValue:resource.lookup('prnt_mthd_dvcd'),
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							selectOnFocus: true,
							allowBlank	: true,
							lookupValue	: resource.lookup('prnt_mthd_dvcd')
						},
					},{	dataIndex:	'page_qntt'			, width:  80, align : 'right'	, text: Language.get( 'page_qntt'		, '페이지수'	), xtype:'numericcolumn'
					},{	dataIndex:	'esti_pric'	, width: 100, align : 'right'	, text: Language.get( 'esti_amnt_indx'	, '견적단가'	), xtype:'numericcolumn'
					},{	dataIndex:	'esti_amnt'			, width: 100, align : 'right'	, text: Language.get( 'esti_amnt'		, '견적금액'	), xtype:'numericcolumn'
					}
//					,{	dataIndex:	'fabc_idcd'			, width: 100, align : 'left'	, text: Language.get( ''		, 'fabc'	)
//					}
				]
			}
		;
		return item;
	},
	/******************************************************************
	 * 추가하기 위해 ROW를 생성하고, Focus를 옮긴다.(Ctrl+ Insert or 행추가 버튼)
	 ******************************************************************/
	rowInsert: function(){
		var me			= this,
			myform		= me.up('grid'),
			store		= myform.getStore(),
			record		= undefined,
			max_seq		= 0,
			select		= myform.getSelectionModel().getSelection()[0],
			lastidx		= store.count(),
			editor		= myform.up('form'),
			invc_numb	= editor.down('[name=invc_numb]').getValue(),
			scls_idcd	= select.get("item_scls_idcd")
		;
		console.log(scls_idcd);
		max_seq = 0;
		store.each(function(findrecord) {
			if (findrecord.get('line_seqn') > max_seq) {
				max_seq		= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
			}
		});
		max_seq = max_seq + 1;
		record = Ext.create( store.model.modelName , {
			invc_numb	: invc_numb,
			line_seqn	: max_seq
		});

		// ROW 추가
		store.add(record);
		Ext.ComponentQuery.query('module-workshop-estimast-editor')[0].down('[name=modify]').setValue('Y');

		myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
	},
	/******************************************************************d
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var me = this,
			myform		= me.up('grid'),
			records		= myform.getSelectionModel().getSelection();
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
		}Ext.ComponentQuery.query('module-workshop-estimast-editor')[0].down('[name=modify]').setValue('Y');
	},
	cellEditAfter : function (editor, context) {
		var me = this,
			grid = this,
			pos = this.view.getSelectionModel().getCurrentPosition().row,
			models = grid.getStore().getRange()
		;
		console.log(context);
	},

	listeners: {
		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},
	}
});
