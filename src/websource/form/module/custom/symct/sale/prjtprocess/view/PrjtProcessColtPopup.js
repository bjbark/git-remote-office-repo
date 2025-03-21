Ext.define('module.custom.symct.sale.prjtprocess.view.PrjtProcessColtPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-prjtprocess-colt-popup',
	store	: 'module.custom.symct.sale.prjtprocess.store.PrjtProcessDetail8',
	title	: '수금 보고' ,
	closable: true,
	autoShow: true,
	width	: 761 ,
	height	: 457,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createGrid(),me.createForm()];
		me.callParent(arguments);
	},

	listeners:{
		render:function(){
			var store = this.down('grid').getStore(),
				param = Ext.merge( this.down('form').getValues(), { hq_id : _global.hq_id
				}, this.popup.params )
			;
			store.load({
				params : { param:JSON.stringify(param) }, scope:this,
				callback:function(records, operation, success) {
				}
			});
		}
	},

	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style',
							handler: me.rowInsert
						},
						{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style',
							handler: me.rowDelete
						},
						'->' ,
						{ xtype : 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype : 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       ,cls: 'button-style'}
					]
				}
			],
		};
		return form;
	},

	createGrid: function(){
		var  me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'north',
				height		: 395,
				viewConfig	: {
					loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask })
				},
				selModel	: { selType: 'cellmodel'},
				features	: [{ ftype : 'grid-summary' }],
				plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
				store		: Ext.create( me.store ),
				paging		:{
					xtype : 'grid-paging'
				},
				columns : [
					{	dataIndex : 'pjod_idcd'		, width: 150, text: Language.get('pjod_idcd'	,	'수주ID'		) , align: 'left', hidden : true,
					},{	dataIndex : 'line_seqn'		, width:  40, text: Language.get('line_seqn'	,	'번호'		) , align: 'center'
					},{	dataIndex : 'colt_dvcd'		, width: 100, text: Language.get('colt_dvcd'	,	'수금구분'	) , xtype: 'lookupcolumn'  , lookupValue : resource.lookup('colt_dvcd'), align:'center'
					},{	dataIndex : 'colt_degr'		, width:  40, text: Language.get('colt_degr'	,	'차수'		) , align: 'center'
					},{	dataIndex : 'plan_date'		, width:  95, text: Language.get('plan_date'	,	'예정일자'	) , align: 'center'
					},{	dataIndex : 'plan_amnt'		, width: 100, text: Language.get('plan_amnt'	,	'예정금액'	) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'colt_date'		, width:  95, text: Language.get('colt_date'	,	'수금일자'	) , align: 'center',
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
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						tdCls		: 'editingcolumn',
						editor		: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							allowBlank	: false,
							editable	: false,
						},
					},{	dataIndex : 'colt_amnt'	, width: 100, text: Language.get('colt_amnt'	,	'수금금액'	) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',
						tdCls : 'editingcolumn',
						editor	: {
							xtype			:'numericfield',
							selectOnFocus	: true,
							allowBlank		: false
						}
					},{	dataIndex : 'drtr_idcd'		, width:  80, text: Language.get('drtr_idcd'	,	'담당자ID'	) , align:'center', hidden : true
					},{	dataIndex : 'modify'		, width:  80, text: Language.get('modify'		,	'수정확인'	) , align:'center', hidden : true
					},{	dataIndex : 'drtr_name'		, width:  80, text: Language.get('drtr_name'	,	'담당자명'	) , align:'left'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '담당자찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-user-popup',
										result	: function(records) {
											var	parent = records[0];
											record.set('drtr_idcd',parent.data.user_idcd);
											record.set('drtr_name',parent.data.user_name);
										}
									})
								},
								scope : me
							}
						]
					}
				]
			}
		;
		return grid;
	},


	//조회
	selectAction : function(){
		var  me = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), {hq_id : _global.hq_id
			}, me.popup.params );
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
			}
		});
	},
	//확인
	finishAction: function(){
		var me = this,
			selects       = me.down('grid').getSelectionModel().getSelection()[0],
			store         = me.down('grid').getStore(),
			listermaster  = Ext.ComponentQuery.query('module-prjtprocess-lister-master')[0],
			listerdetail8 = Ext.ComponentQuery.query('module-prjtprocess-lister-detail8')[0],
			store2        = listerdetail8.getStore(),
			changes       = me.down('grid').getStore().getUpdatedRecords().length,
			record        = listermaster.getSelectionModel().getSelection()[0],
			length   = store.data.items.length,
			change   = store.data.items,
			modify   = change[length-1].get('modify'),		//수정유무
			remove   = store.removed.length	//삭제유무
		;
		if(changes == 0){
			if (modify != 'Y'&& remove == 0) {
				Ext.Msg.alert("알림", "변경 된 사항이 없습니다.");
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
				mask.show();
				me.down('grid').getStore().sync({
					success : function(operation){ },
					failure : function(operation){ },
					callback: function(operation){
						mask.hide();
					}
				});
				listerdetail8.select({
					callback : function(records, operation, success) {
							if (success) {
							} else {}
						}, scope : me
				}, { pjod_idcd : record.get('pjod_idcd') });
				this.close();
			}
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			me.down('grid').getStore().sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
				}
			});
			listerdetail8.select({
				callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
			}, { pjod_idcd : record.get('pjod_idcd') });
			this.close();
		}
	},
	/******************************************************************
	 * 추가하기 위해 ROW를 생성하고, Focus를 옮긴다.(Ctrl+ Insert or 행추가 버튼)
	 ******************************************************************/
	rowInsert: function(){
		var me			= this,
			myform		= me.up('window').down('grid'),
			store		= me.up('window').down('grid').getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
//			master		= Ext.ComponentQuery.query('module-eposetstoreschd-lister-mst')[0],
			select		= myform.getSelectionModel().getSelection()[0],
			lastidx		= store.count()
		;
		max_seq = 0;
		if(select){
			store.each(function(findrecord) {
				if (findrecord.get('line_seqn') > max_seq) {
					max_seq	= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
				}
			});
			max_seq = max_seq + 1;
			record = Ext.create( store.model.modelName , {
				pjod_idcd	: select.get('pjod_idcd'),			//
				line_seqn	: max_seq,							//순번
				plan_amnt	: select.get('plan_amnt'),			//예정금액
				plan_date	: select.get('plan_date'),			//예정일자
				colt_dvcd	: select.get('colt_dvcd'),			//결제구분
				colt_degr	: select.get('colt_degr')+1,		//차수
				modify		: 'Y',		//차수
			});

//			record.recalculation(editor.getRecord());

			// ROW 추가
			store.add(record);

			myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
		}else{
			Ext.Msg.alert("알림","추가할 수금을 선택하여 주십시오.");
		}
	},
	/******************************************************************
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var me = this,
			myform		= me.up('window').down('grid'),
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