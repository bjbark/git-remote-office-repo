Ext.define('module.custom.aone.item.itemmast.view.ItemMastMemoLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemmast-memolister'			,
	store		: 'module.custom.aone.item.itemmast.store.ItemMastMemo'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },

	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
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
					{	dataIndex:	'line_seqn'			, width:  60, align : 'center'	, text: Language.get( 'line_seqn'	, '순번'		)
					},{	dataIndex:	'item_idcd'			, width:  80, align : 'center'	, text: Language.get( 'item_idcd'	, '품목ID'	) ,hidden : true
					},{	dataIndex:	'memo_dvcd'			, width:  80, align : 'center'	, text: Language.get( 'memo_dvcd'	, '메모구분'	) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('memo_dvcd'),
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							selectOnFocus: true,
							allowBlank	: true,
							lookupValue: resource.lookup( 'memo_dvcd' )
						},
					},{	dataIndex:	'memo_date'			, width: 100, align : 'left'	, text: Language.get( 'memo_date'	, '작성일'		)
					},{	dataIndex:	'drtr_name'			, width: 100, align : 'left'	, text: Language.get( 'drtr_name'	, '담당자'		)
					},{	dataIndex:	'item_memo'			, flex : 1, align : 'left'	, text: Language.get( 'item_memo'		, '메모내용'	),
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true
						},
					}
				]
			}
		;
		return item;
	},
	listeners:{
		edit:function(){
			Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');
		}
	},
	/******************************************************************
	 * 추가하기 위해 ROW를 생성하고, Focus를 옮긴다.(Ctrl+ Insert or 행추가 버튼)
	 ******************************************************************/
	rowInsert: function(){
		var me			= this,
			myform		= me.up('grid'),
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			select		= myform.getSelectionModel().getSelection()[0],
			lastidx		= store.count(),
			editor		= myform.up('form'),
			item_idcd	= editor.down('[name=item_idcd]').getValue()
		;
		max_seq = 0;
		store.each(function(findrecord) {
			if (findrecord.get('line_seqn') > max_seq) {
				max_seq		= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
				memo_date	= new Date();

			}
		});
		max_seq = max_seq + 1;
		record = Ext.create( store.model.modelName , {
			item_idcd	: item_idcd,
			memo_date	: Ext.util.Format.date(new Date(),'Ymd') ,	//
			drtr_name	: _global.login_nm,
			drtr_idcd	: _global.login_id,
			line_seqn	: max_seq,	//
			modify		: 'Y',
		});

//			record.recalculation(editor.getRecord());

		// ROW 추가
		store.add(record);
		Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');

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
		}Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');
	}

});
