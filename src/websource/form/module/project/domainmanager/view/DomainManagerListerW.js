Ext.define('module.project.domainmanager.view.DomainManagerListerW', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-domainmanager-lister-w',
	store: 'module.project.domainmanager.store.Word',
	columnLines: true ,
//	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },




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
				'->', '-',
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style'}, '-'
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
					{	dataIndex: 'w_nm'           , width: 100, text: 'Name', align: 'left'
				 		,editor: {
				 			selectOnFocus: true,
				 			allowBlank: true,
				 			listeners: {
				 				specialkey: function(field, e){
				 					if (e.getKey() === e.ENTER) {
				 						field.ownerCt.grid.view.getSelectionModel().onKeyDown();
				 					}
				 				}
				 			}
				 		}
					},{	dataIndex: 'w_id'           , width: 120, text: 'ID', align: 'left'
				 		,editor: {
				 			selectOnFocus: true,
				 			allowBlank: true,
				 			listeners: {
				 				specialkey: function(field, e){
				 					if (e.getKey() === e.ENTER) {
				 						field.ownerCt.grid.view.getSelectionModel().onKeyDown();
				 					}
				 				}
				 			}
				 		}
					},{	dataIndex: 'w_id_2'         , width: 120, text: 'ID2', align: 'left'
				 		,editor: {
				 			selectOnFocus: true,
				 			allowBlank: true,
				 			listeners: {
				 				specialkey: function(field, e){
				 					if (e.getKey() === e.ENTER) {
				 						field.ownerCt.grid.view.getSelectionModel().onKeyDown();
				 					}
				 				}
				 			}
				 		}
					},{	dataIndex: 'full_nm'	    , flex :   1, text: 'Full name', align: 'left'
				 		,editor: {
				 			selectOnFocus: true,
				 			allowBlank: true,
				 			listeners: {
				 				specialkey: function(field, e){
				 					if (e.getKey() === e.ENTER) {
				 						field.ownerCt.grid.view.getSelectionModel().onKeyDown();
				 					}
				 				}
				 			}
				 		}
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
			     	},
		     	    { /* Ctrl + Insert */
		     		    ctrl:true, key: 45,
			     		fn	: function(key,e){
	 						var store		= me.getStore(),
	 							record		= undefined,
	 							findrecord	= undefined,
	 							is_equal	= false,
	 							max_seq		= 0,
	 							master		= Ext.ComponentQuery.query('module-domainmanager-lister-w')[0],
	 							select		= master.getSelectionModel().getSelection()[0],
	 						    lastidx		= store.count()
	 					;
	 					record = Ext.create( store.model.modelName , {
//	 						str_nm		: '' ,
//	 						truck_no 	: select.get('truck_no') ,  // 마스터 레코드에 항목을 디테일에 적용한다...
	 					});
	 					max_seq	= 0;
	 					store.each(function(findrecord) {
	 						if (findrecord.get('seq') > max_seq) {
	 							max_seq	= findrecord.get('seq');   // 최종으로 사용한 항번을 찾는다....
	 						}
	 						max_seq = max_seq + 1;
	 					});
	 					// ROW 추가
// 						record.recalculation(editor.getRecord());
 						store.add(record);

	 					me.plugins[0].startEdit(lastidx , 0);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다.
		     			}
		     	    }

			    ]
			});
		}
	}
});





