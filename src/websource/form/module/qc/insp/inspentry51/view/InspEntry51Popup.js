Ext.define('module.qc.insp.inspentry51.view.InspEntry51Popup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-inspentry51-popup',
	store	: 'module.qc.insp.inspentry51.store.InspEntry51Popup',
	title	: '출고검사 작성' ,
	closable: true,
	autoShow: true,
	width	: 680 ,
	height	: 330,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',


	initComponent: function(){
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
				height		: 300,
				viewConfig	: {
					loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask })
				},
				selModel	:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
				store		: Ext.create( me.store ),
				paging		:{
					xtype : 'grid-paging',
					items : [
						'->' ,
						{ xtype : 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype : 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       ,cls: 'button-style'}
					]
				},
				columns : [
					{	dataIndex:	'invc_numb'		, width:  50, align : 'center'	, text: Language.get('invc_numb'		, 'INVOICE번호'	), hidden : true
					},{	dataIndex:	'acpt_numb'		, width:  50, align : 'center'	, text: Language.get('acpt_numb'		, '수주번호'		), hidden : true, itemId : 'pjod_idcd'
					},{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text: Language.get('line_seqn'		, '순번'			)
					},{	dataIndex:	'insp_sbsc_name', width: 150, align : 'left'	, text: Language.get('insp_sbsc_name'	, '검사항목명'	)
					},{	dataIndex:	'insp_cond'		, width: 345, align : 'left'	, text: Language.get('insp_cond'		, '검사조건'		)
					},{	dataIndex:	'msmt_valu_1fst', width:  70, align : 'center'	, text: Language.get('msmt_valu_1fst'	, '적합여부'		),itemId		: 'judt_dvcd'
						, tdCls : 'editingcolumn',xtype : 'lookupcolumn', lookupValue : [["0","아니오"],["1","예"],["2","해당없음"]],
						editor	: {
							xtype		: 'lookupfield',
							name		: 'msmt_valu_1fst',
							itemId		: 'msmt_valu_1fst',
							selectOnFocus: true,
							allowBlank	: false,
							clearable	: true ,
							lookupValue	: [["0","아니오"],["1","예"],["2","해당없음"]]
						}
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
			selects		= me.down('grid').getSelectionModel().getSelection()[0],
			store		= me.down('grid').getStore(),
			lister		= Ext.ComponentQuery.query('module-inspentry51-lister1')[0],
			changes		= me.down('grid').getStore().getUpdatedRecords().length,
			changeStore	= me.down('grid').getStore().getUpdatedRecords(),
			record		= lister.getSelectionModel().getSelection()[0],
			invc_numb	= me.popup.params.invc_numb,
			acpt_numb	= me.popup.params.acpt_numb,
			insp_sbsc_name = me.popup.params.insp_sbsc_name
		;

		for(var i = 0 ; i < changes; i++){
			changeStore[i].data.invc_numb = invc_numb;
			changeStore[i].data.acpt_numb = acpt_numb;
		};
		if(changes == 0){
			Ext.Msg.alert("알림", "변경 된 사항이 없습니다.");
		}else if(changes == 1 || changes == 2){
			Ext.Msg.show({ title: '알림', msg: '적합여부값은 전항목에 넣어주어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			me.down('grid').getStore().sync({
				success : function(operation){},
				failure : function(operation){},
				callback: function(operation){
					mask.hide();
				}
			});
			this.close();
		}console.log(changes);
	}
});