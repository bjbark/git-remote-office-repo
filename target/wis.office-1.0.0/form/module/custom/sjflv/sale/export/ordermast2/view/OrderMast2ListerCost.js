Ext.define('module.custom.sjflv.sale.export.ordermast2.view.OrderMast2ListerCost', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sjflv-export-ordermast2-lister-cost',

	store: 'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2Cost',
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{	fieldLabel	: Language.get( 'paym_cstm_name', '지급처' ),
						xtype:'textfield',
						name : 'paym_cstm_name',
						listeners:{
							blur:function(){
								var editor = me.ownerCt.ownerCt;
								editor.down('[name=modify]').setValue('Y');
							}
						}
					}, {
						fieldLabel	: Language.get( 'paym_date', '지급일' ),
						xtype		: 'datefield',
						name		: 'paym_date',
						width		: 160,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: new Date(),  // defaults to today,
						listeners:{
							change:function(cont,val){
								var editor = me.ownerCt.ownerCt;
								editor.down('[name=modify]').setValue('Y');
							}
						}
					}
				],
				pagingButton : false
			}
		;
		return item;
	},


	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_seqn'			, width:  50, align : 'center'	, text: Language.get('line_seqn'			, '항번'			)
					},{	dataIndex: 'trde_exps_dvcd'		, width: 100, align : 'left'	, text: Language.get('trde_exps_dvcd'		, '비용구분'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('trde_exps_dvcd'),
					},{	dataIndex: 'krwn_amnt'			, width:  80, align : 'right'	, text: Language.get('krwn_amnt'			, '금액(원화)'		), xtype: 'numericcolumn', summaryType: 'sum',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row, grid.columns[3]);
									}else if(e.keyCode == 38){
										grid.plugins[0].startEdit(row-1, grid.columns[2]);
									}else if(e.keyCode == 40){
										grid.plugins[0].startEdit(row+1, grid.columns[2]);
									}
								}
							}
						}
					},{	dataIndex: 'krwn_vatx'			, width: 85, align : 'right'	, text: Language.get('krwn_vatx'	, '부가세(원화)'	), xtype: 'numericcolumn', summaryType: 'sum',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row, grid.columns[5]);
									}else if(e.keyCode == 38){
										grid.plugins[0].startEdit(row-1, grid.columns[3]);
									}else if(e.keyCode == 40){
										grid.plugins[0].startEdit(row+1, grid.columns[3]);
									}
								}
							}
						}
					},{	dataIndex: 'total'			, width: 90 , align : 'right'	, text: Language.get('total'			, '지급액(원화)'	), xtype: 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'remk_text'			, flex : 1  , minWidth: 200		, align : 'left'	, text: Language.get('remk_text'			, '비고'		),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row+1, grid.columns[1]);
									}else if(e.keyCode == 38){
										grid.plugins[0].startEdit(row-1, grid.columns[6]);
									}else if(e.keyCode == 40){
										grid.plugins[0].startEdit(row+1, grid.columns[6]);
									}
								}
							}
						}
					}
				]
			};
		return item;
	},

	cellEditAfter : function (editor, context) {
		var	me		= this,
			record	= context.record,
			row		= context.rowIdx,
			gridAt	= context.grid.getStore().getAt(row),
			editor	= context.grid.ownerCt.ownerCt
		;
		var krwn_amnt = record.get('krwn_amnt'),
			krwn_vatx = record.get('krwn_vatx')
		;

		if(context.field=='krwn_amnt' || context.field=='krwn_vatx'){
			gridAt.set('total',(krwn_amnt?krwn_amnt:0)+(krwn_vatx?krwn_vatx:0));
		}

	},

	listeners: {
		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
				target: me.getEl().dom,
				binding: [
					/* Ctrl + Delete */
					{	ctrl:true, key: 46,
						fn: function(key,e){
							var records = me.getSelectionModel().getSelection();
							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button==='yes') {
										me.getStore().remove (records);
										Ext.ComponentQuery.query('module-sjflv-export-ordermast2-editor')[0].down('[name=modify]').setValue('Y');
									}
								}
							});
						}
					}
				]
			});
		},
	},
	rowInsert: function(){
		var me			= this,
			master		= Ext.ComponentQuery.query('module-sjflv-export-ordermast2-lister-master')[0],
			store		= myform.getStore(),
			myform		= me.up('grid'),
			editor		= myform.ownerCt.ownerCt,
			max_seq		= 0,
			select		= master.getSelectionModel().getSelection()[0],
			lastidx		= store.count(),
			new_invc_numb = ''
		;
		if(!select){
			return;
		}
		max_seq = 0;
		store.each(function(findrecord) {
			if (findrecord.get('line_seqn') > max_seq) {
				max_seq		= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
			}
		});
		max_seq = max_seq + 1;
		if(select.get('exps_numb')){
			new_invc_numb = select.get('exps_numb')
		}else{
			Ext.Ajax.request({
				url		: _global.location.http() + '/listener/seq/maxid.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'expt_exps_mast'
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
						new_invc_numb = result.records[0].seq;
					}
				},
				failure : function(result, request) {
					Ext.Msg.error(result.mesage);
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
		if(new_invc_numb != ''){
			record = Ext.create( store.model.modelName , {
				updt_user_name	: _global.login_nm,
				updt_idcd		: _global.login_id,
				line_seqn		: max_seq,	//
				invc_numb		: new_invc_numb,
				orig_invc_numb	: select.get('ordr_numb'),
				orig_amnd_degr	: select.get('amnd_degr'),
				orig_seqn		: select.get('line_seqn')
			});
			store.add(record);
			editor.down('[name=modify]').setValue('Y');
		}
		// ROW 추가
		myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
	},
	/******************************************************************d
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var me = this,
			myform		= me.up('grid'),
			editor		= myform.ownerCt.ownerCt,
			records		= myform.getSelectionModel().getSelection();
		if(records.length == 0){
			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
				fn : function (button) {
					if (button==='yes') {
						myform.getStore().remove(records);
						editor.down('[name=modify]').setValue('Y');
					}
				}
			});
		}
	}
});
