Ext.define('module.project.domainmanager.view.DomainManagerListerT', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-domainmanager-lister-t',
	store: 'module.project.domainmanager.store.TableDetail',
	columnLines: true ,
	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},




	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
			xtype : 'grid-paging',
			items: [
				'->', '-' ,
				{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
				{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
				{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } , '-' ,
				{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
		    ]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align:center', align: 'center'},
				items : [
					{	dataIndex: 'tabl_idcd'      , width:  70, text: 'ID Key', hidden: true
					},{	dataIndex: 'fld_seq'     , width:  40, text: 'seq', align: 'right'
					},{	dataIndex: 'fied_idcd'      , width: 120, text: 'Field ID', align: 'left'
					},{	dataIndex: 'fied_name'    , width: 120, text: 'Field Name' , align: 'left'
					},{	dataIndex: 'tabl_name'      , width: 110, text: '테이블명', align: 'left', hidden: true
					},{	dataIndex: 'data_type'   , width:  80, text: 'Type'
					},{	dataIndex: 'data_len'    , width:  40, text: '길이'
					},{	dataIndex: 'key_dvcd'      , width:  40, text: 'Key'
					},{	dataIndex: 'null_dvcd'     , width:  50, text: 'is null'
					},{	dataIndex: 'dflt_valu'    , width:  60, text: 'Default'
					},{	dataIndex: 'ref_table'   , width: 120, text: 'Ref.Table' , align: 'left'
					},{	dataIndex: 'prnt_gbcd'   , width:  90, text: '코드구분값' , align: 'left'
					},{	dataIndex: 'prnt_txt'    , width: 200, text: '등록된 코드' , align: 'left'
					},{	dataIndex: 'inter_val'   , width: 240, text: 'Internal Values', align: 'left'
					},{	dataIndex: 'old_id'      , width: 120, text: '참조ID' , align: 'left', font_color : Const.COLOR.FONT.tax_amt, hidden: true
					},{	dataIndex: 'old_nm'      , width: 380, text: '참조설명' , align: 'left', hidden: true
					},{	dataIndex: 'dscrt'       , flex :   1, text: '참조사항' , align: 'left'
//					},{	dataIndex: 'word_1'       , width:  70, text: '단어명1'
//					},{	dataIndex: 'id_1'        , width:  60, text: '코드1'
//					},{	dataIndex: 'word_2'       , width:  70, text: '단어명2'
//					},{	dataIndex: 'id_2'        , width:  60, text: '코드2'
//					},{	dataIndex: 'word_3'       , width:  70, text: '단어명3'
//					},{	dataIndex: 'id_3'        , width:  60, text: '코드3'
//					},{	dataIndex: 'word_4'       , width:  70, text: '단어명4'
//					},{	dataIndex: 'id_4'        , width:  60, text: '코드4'
//					},{	dataIndex: 'word_5'       , width:  70, text: '단어명5'
//					},{	dataIndex: 'id_5'        , width:  60, text: '코드5'
//					},{	dataIndex: 'word_6'       , width:  70, text: '단어명6'
//					},{	dataIndex: 'id_6'        , width:  60, text: '코드6'
					}
	         	]
			}
		;
		return item;
	},

	listeners: {
		edit: function(editor, e) {
			var me = this;
			// 과세계산
//			e.record.recalculation(me.editor.getRecord());
		},
		keypress: {
			element: 'el',
			fn: function(e, iElement ) {
				key = e.getKey();
				if (key != undefined && key != e.LEFT && key != e.RIGHT && key != e.UP && key != e.DOWN && key != e.ENTER && key != e.ESC) {
					var grid = Ext.getCmp(this.id),
						pos  = grid.getView().selModel.getCurrentPosition()
					;
				}
			}
		},
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
			    target	: me.getEl().dom,
			    binding	: [
			     	/* Ctrl + Delete */
			     	{	ctrl:true, key: 46,
			     		fn: function(key,e){
			     			var records = me.getSelectionModel().getSelection();
			     			var err_msg = "";
			     	 		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			     	 			fn : function (button) {
			     	 				if (button==='yes') {
			     	 					me.getStore().remove (records);
			     	 				}
			     	 			}
			     			});
			     		}
			     	}
			    ]
			});
		}
	}
});





