Ext.define('module.prod.basic.prodlineroute.ProdLineRoute', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup'
	],

	models	: [
			'module.prod.basic.prodlineroute.model.ProdLineRoute',
			'module.prod.basic.prodlineroute.model.ProdLineRouteDetail',
			'module.prod.basic.prodlineroute.model.ProdLineRouteItem1',
			'module.prod.basic.prodlineroute.model.ProdLineRouteItem2'
	],
	stores	: [
		'module.prod.basic.prodlineroute.store.ProdLineRoute',
		'module.prod.basic.prodlineroute.store.ProdLineRouteDetail',
		'module.prod.basic.prodlineroute.store.ProdLineRouteItem1',
		'module.prod.basic.prodlineroute.store.ProdLineRouteItem2'
	],
	views	: [
		'module.prod.basic.prodlineroute.view.ProdLineRouteLayout',
		'module.prod.basic.prodlineroute.view.ProdLineRouteSearch',
		'module.prod.basic.prodlineroute.view.ProdLineRouteMaster',
		'module.prod.basic.prodlineroute.view.ProdLineRouteDetail',
		'module.prod.basic.prodlineroute.view.ProdLineRouteItem',
		'module.prod.basic.prodlineroute.view.ProdLineRouteItem1',
		'module.prod.basic.prodlineroute.view.ProdLineRouteItem2'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodlineroute-layout button[action=selectAction]'	: { click : me.selectAction },	// 조회
			'module-prodlineroute-layout button[action=enrollment]'	: { click : me.enrollment },	//1건등록(<)
			'module-prodlineroute-layout button[action=remove]'		: {	click : me.remove	  },		//1건삭제(>)
			// lister detail event
			'module-prodlineroute-lister-detail button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-prodlineroute-lister-detail button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-prodlineroute-lister-item1 button[action=updateAction2]' : { click : me.updateAction2 },	// 엑셀
			// lister master event
			'module-prodlineroute-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-prodlineroute-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-prodlineroute-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-prodlineroute-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-prodlineroute-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-prodlineroute-lister-detail')[0] },
		listeritem	: function () { return Ext.ComponentQuery.query('module-prodlineroute-lister-item')[0] },
		listeritem1	: function () { return Ext.ComponentQuery.query('module-prodlineroute-lister-item1')[0] },
		listeritem2	: function () { return Ext.ComponentQuery.query('module-prodlineroute-lister-item2')[0] }
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
			Ext.Msg.alert("알림", "공정순서목록에서 검색하여주십시오.");
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
			}, { wkfw_idcd : record.get('wkfw_idcd') });
		}
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			master		= me.pocket.listermaster();
			tindex		= tabPanel.items.indexOf(newCard),
//			listeritem	= me.pocket.listeritem(),
			listeritem1	= me.pocket.listeritem1(),
			listeritem2	= me.pocket.listeritem2(),
			records		= master.getSelectionModel().getSelection()
		;
		if (tindex == 1) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "수정 또는 조회할 공정을 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var record = records[0]
//			listeritem.down('[name = wkfw_code]').setValue(record.get('wkfw_code'));
//			listeritem.down('[name = wkfw_name]').setValue(record.get('wkfw_name'));


			listeritem1.select({
				callback:function(records, operation, success) {
					if (success) {
						listeritem1.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {wkfw_idcd : record.get('wkfw_idcd')},{stor_id : _global.stor_id}, {}) );

			listeritem2.select({
				callback : function(records, operation, success) {
					if (success) {
						listeritem2.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( { wkfw_idcd : record.get('wkfw_idcd') },{stor_id : _global.stor_id}, {}) );
		}
	},

	// < enrollment
	enrollment:function() {
		var me			= this,
			record		= new Array(),
			seqn		= Number(0),
			store		= listeritem1.getStore(),
			master		= me.pocket.listermaster(),
			mrecords	= master.getSelectionModel().getSelection(),
			mrecord		= mrecords[0],
			store2		= listeritem2.getStore(),
			selects		= listeritem2.getSelectionModel().getSelection();
		;
		if (!selects || selects.length < 0) {
			Ext.Msg.alert("알림", "추가할 공정순서를 선택하여 주십시오.");
			return;
		};
		if(store.data.items.length >0){
			seqn = Number(store.data.items[store.data.items.length-1].data.line_seqn)+1;
		}else{
			seqn = 1;
		}
		var seqnArray = new Array();
		for (var int = 0; int < selects.length; int++) {
			seqnArray[int] = seqn++;
		}
		var i = 0;
		for( i = 0; i<selects.length; i++){
		record[i] = Ext.create( store.model.modelName , {
			_set			: 'insert',
			wkfw_idcd		: mrecord.get('wkfw_idcd'),
			line_seqn		: seqnArray[i],
			wkct_idcd		: selects[i].get('wkct_idcd'),
			wkct_name		: selects[i].get('wkct_name'),
			wkct_code		: selects[i].get('wkct_code'),
			wkct_insp_yorn	: selects[i].get('wkct_insp_yorn'),
			last_insp_yorn	: selects[i].get('last_insp_yorn'),
			aftr_wkct_ordr	: selects[i].get('aftr_wkct_ordr'),
			line_stat		:'0'
			});
		}
		store.add(record);
		store.sync({
			callback: function(batch, options) {
				listeritem2.select({
					callback : function(records, operation, success) {
						if (success) {
							listeritem2.getSelectionModel().select(0);
						} else {
						}
					}, scope:me
				}, Ext.merge( { wkfw_idcd : mrecord.get('wkfw_idcd') },{stor_id : _global.stor_id}, {}) );
			} ,
			scope: me
		},{	synchro : _global.objects.synchro} );


	},

	// > remove
	remove : function() {
		var me = this,
			store		= listeritem1.getStore(),
			selects		= listeritem1.getSelectionModel().getSelection()
			store2		= listeritem2.getStore()
		;
		store.remove (selects);
		store.sync({
			callback : function() {
				store2.reload();
			}
		});

	},
	updateAction : function() {
		var me = this,
		lister = me.pocket.listerdetail(),
		changes = lister.getStore().getUpdatedRecords().length
	;
		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
			store.sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
				}
			});
		}
	},
	updateAction2 : function() {
		var me = this,
		item1 = me.pocket.listeritem1(),
		changes = item1.getStore().getUpdatedRecords().length
	;
		console.log(item1.getStore().getUpdatedRecords());
		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = item1.getStore();
			store.sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
				}
			});
		}
	},
	// 엑셀
	exportAction : function() {
//		this.pocket.listermaster().writer({enableLoadMask:true});
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});