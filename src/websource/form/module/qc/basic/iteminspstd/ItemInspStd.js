Ext.define('module.qc.basic.iteminspstd.ItemInspStd', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.ItemPopup',
	],
	models	: [
		'module.qc.basic.iteminspstd.model.ItemInspStdMaster',
		'module.qc.basic.iteminspstd.model.ItemInspStdDetail',
		'module.qc.basic.iteminspstd.model.ItemInspStdItem1',
		'module.qc.basic.iteminspstd.model.ItemInspStdItem2'
	],
	stores	: [
		'module.qc.basic.iteminspstd.store.ItemInspStdMaster',
		'module.qc.basic.iteminspstd.store.ItemInspStdDetail',
		'module.qc.basic.iteminspstd.store.ItemInspStdItem1',
		'module.qc.basic.iteminspstd.store.ItemInspStdItem2'
	],
	views	: [
		'module.qc.basic.iteminspstd.view.ItemInspStdLayout',
		'module.qc.basic.iteminspstd.view.ItemInspStdSearch',
		'module.qc.basic.iteminspstd.view.ItemInspStdListerMaster',
		'module.qc.basic.iteminspstd.view.ItemInspStdListerDetail',
		'module.qc.basic.iteminspstd.view.ItemInspStdListerItem',
		'module.qc.basic.iteminspstd.view.ItemInspStdListerItem1',
		'module.qc.basic.iteminspstd.view.ItemInspStdListerItem2'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-iteminspstd-layout button[action=selectAction]'	: { click : me.selectAction },	// 조회
			'module-iteminspstd-layout button[action=enrollment]'	: { click : me.enrollment },	//1건등록(<)
			'module-iteminspstd-layout button[action=remove]'		: { click : me.remove },		//1건삭제(>)
			// lister detail event
			'module-iteminspstd-lister-detail button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister master event
			'module-iteminspstd-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-iteminspstd-layout #mainpanel' : {
//				tabchange : me.mainTabChange
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-iteminspstd-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-iteminspstd-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-iteminspstd-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-iteminspstd-lister-detail')[0] },
		listeritem	: function () { return Ext.ComponentQuery.query('module-iteminspstd-lister-item')[0] },
		listeritem1	: function () { return Ext.ComponentQuery.query('module-iteminspstd-lister-item1')[0] },
		listeritem2	: function () { return Ext.ComponentQuery.query('module-iteminspstd-lister-item2')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			listeritem1 = me.pocket.listeritem1(),
			listeritem2 = me.pocket.listeritem2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if (tindex == 0) {
			listermaster = me.pocket.listermaster();
			listermaster.select({
				callback:function(records, operation, success) {
					if (success) {
						listerdetail.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		} else{
			mask.hide();
			Ext.Msg.alert("알림", "검사리스트목록에서 검색하여주십시오.");
		}
	},


	attachRecord:function( smodel, record ){
		var me	= this,
		listermaster= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
		record		= record ? record[0] : lister.getSelectionModel().getSelection()[0]
		;
		me.pocket.listerdetail().eraser() ;
		if (record) {
		}
	},

	//선택
	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.listerdetail()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { insp_type_idcd : record.get('insp_type_idcd') ,item_idcd : record.get('item_idcd')});
		}
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			master		= me.pocket.listermaster();
			tindex		= tabPanel.items.indexOf(newCard),
			listeritem	= me.pocket.listeritem(),
			listeritem1	= me.pocket.listeritem1(),
			listeritem2	= me.pocket.listeritem2(),
			records		= master.getSelectionModel().getSelection()
		;
		if (tindex == 1) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "수정 또는 조회할 품목을 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var record = records[0]
			listeritem.down('[name = insp_type_code]').setValue(record.get('insp_type_code'));
			listeritem.down('[name = insp_type_name]').setValue(record.get('insp_type_name'));
			listeritem.down('[name = insp_mthd_dvcd]').setValue(record.get('insp_mthd_dvcd'));

			listeritem1.select({
				callback:function(records, operation, success) {
					if (success) {
						listeritem1.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {insp_type_idcd : record.get('insp_type_idcd')},{stor_id : _global.stor_id}, {}) );

			listeritem2.select({
				callback : function(records, operation, success) {
					if (success) {
						listeritem2.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {insp_type_idcd : record.get('insp_type_idcd')},{stor_id : _global.stor_id}) );
		}
	},

	// < enrollment
	enrollment:function() {
		var me			= this,
			record		= new Array(),
			seqn		= Number(0),
			store		= listeritem1.getStore(),
			store2		= listeritem2.getStore(),
			master		= me.pocket.listermaster(),
			mrecords	= master.getSelectionModel().getSelection(),
			mrecord		= mrecords[0]
			selects		= listeritem2.getSelectionModel().getSelection();
		;
		if (!selects || selects.length<0) {
			Ext.Msg.alert("알림", "추가할 작업자를 선택하여 주십시오.");
			return;
		};
		if(store.data.items.length >0){
			seqn = Number(store.data.items[store.data.items.length-1].data.line_seqn)+1;
		}else{
			seqn = 0;
		}
		var seqnArray = new Array();
		for (var int = 0; int < selects.length; int++) {
			seqnArray[int] = seqn++;
		}
		var i = 0;
		for( i = 0; i<selects.length; i++){
			record[i]= Ext.create( store.model.modelName , {
				_set			: 'insert',
				insp_type_idcd	: mrecord.get('insp_type_idcd'),
				line_seqn		: seqnArray[i],
				item_idcd		: selects[i].get('item_idcd'),
				line_stat		:'0'
			});
		}
		store.add(record);
		store.sync({
			callback: function(batch, options) {
				store.reload();
				store2.reload();
			} ,
			scope: me
		},{	synchro : _global.objects.synchro} );
	},

	// > remove
	remove : function() {
		var me = this,
			listeritem	= me.pocket.listeritem(),
			store		= listeritem1.getStore(),
			store2		= listeritem2.getStore(),
			selects		= listeritem1.getSelectionModel().getSelection()
		;
		store.remove (selects);
		store.sync({
			callback : function() {
				store2.reload();
			}
		});
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});