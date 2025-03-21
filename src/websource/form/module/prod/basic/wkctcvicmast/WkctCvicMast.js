Ext.define('module.prod.basic.wkctcvicmast.WkctCvicMast', { extend:'Axt.app.Controller',

	models	: [
		'module.prod.basic.wkctcvicmast.model.WkctCvicMast',
		'module.prod.basic.wkctcvicmast.model.WkctCvicDetail',
		'module.prod.basic.wkctcvicmast.model.WkctCvicMastItem1',
		'module.prod.basic.wkctcvicmast.model.WkctCvicMastItem2'
	],
	stores	: [
		'module.prod.basic.wkctcvicmast.store.WkctCvicMast',
		'module.prod.basic.wkctcvicmast.store.WkctCvicDetail',
		'module.prod.basic.wkctcvicmast.store.WkctCvicMastItem1',
		'module.prod.basic.wkctcvicmast.store.WkctCvicMastItem2'
	],
	views	: [
		'module.prod.basic.wkctcvicmast.view.WkctCvicMastLayout',
		'module.prod.basic.wkctcvicmast.view.WkctCvicMastSearch',
		'module.prod.basic.wkctcvicmast.view.WkctCvicMastListerMaster',
		'module.prod.basic.wkctcvicmast.view.WkctCvicMastListerDetail',
		'module.prod.basic.wkctcvicmast.view.WkctCvicMastListerItem',
		'module.prod.basic.wkctcvicmast.view.WkctCvicMastListerItem1',
		'module.prod.basic.wkctcvicmast.view.WkctCvicMastListerItem2'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-wkctcvicmast-layout button[action=selectAction]'	: { click : me.selectAction },	// 조회
			'module-wkctcvicmast-layout button[action=oneenrollment]'	: { click : me.oneenrollment },	//1건등록(<)
			'module-wkctcvicmast-layout button[action=oneremove]'		: { click : me.oneremove },		//1건삭제(>)
			// lister event
			'module-wkctcvicmast-lister-detail button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister event
			'module-wkctcvicmast-lister-master' : { //* 1번 확정현황 *//
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-wkctcvicmast-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},
		});
		me.callParent(arguments);
	},

	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-wkctcvicmast-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-wkctcvicmast-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-wkctcvicmast-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-wkctcvicmast-lister-detail')[0] },
		listeritem	: function () { return Ext.ComponentQuery.query('module-wkctcvicmast-lister-item')[0] },
		listeritem1	: function () { return Ext.ComponentQuery.query('module-wkctcvicmast-lister-item1')[0] },
		listeritem2	: function () { return Ext.ComponentQuery.query('module-wkctcvicmast-lister-item2')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			listermaster = me.pocket.listermaster()
			listerdetail = me.pocket.listerdetail(),
			listeritem1	= me.pocket.listeritem1(),
			listeritem2	= me.pocket.listeritem2(),
			search = me.pocket.search(),
			param = search.getValues()
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
		} else {
			mask.hide();
			Ext.Msg.alert("알림", "공정목록에서 검색하여주십시오.");
		}
	},

	attachRecord:function( smodel, record ) {
		var me = this,
			listermaster= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
			record		= record ? record[0] : lister.getSelectionModel().getSelection()[0]
		;
		me.pocket.listerdetail().eraser() ;
		if (record) {
		}
	},

	/**
	 * 선택
	 */
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
			}, { wkct_idcd : record.get('wkct_idcd') });
		}
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			master		= me.pocket.listermaster(),
			tindex		= tabPanel.items.indexOf(newCard),
			listeritem	= me.pocket.listeritem(),
			listeritem1	= me.pocket.listeritem1(),
			listeritem2	= me.pocket.listeritem2(),
			records		= master.getSelectionModel().getSelection()
		;
		if (tindex == 1) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "수정 또는 조회할 공정을  선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var record = records[0];
			listeritem.down('[name=wkct_idcd]').setValue(record.get('wkct_code'));
			listeritem.down('[name=wkct_name]').setValue(record.get('wkct_name'));

			listeritem1.select({
				callback : function(records, operation, success) {
					if (success) {
						listeritem1.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {wkct_idcd : record.get('wkct_idcd')},{stor_id : _global.stor_id}, {}) );

			listeritem2.select({
				callback : function(records, operation, success) {
					if (success) {
						listeritem2.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id, wkct_idcd : record.get('wkct_idcd')}, {}) );
		}
	},

	// < 버튼
	oneenrollment:function() {
		var me = this,
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
			Ext.Msg.alert("알림", "추가할 설비를  선택하여 주십시오.");
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
		record[i] = Ext.create( store.model.modelName , {
			_set			: 'insert',
			wkct_idcd		: mrecord.get('wkct_idcd') ,
			line_seqn		: seqnArray[i] ,
			cvic_idcd		: selects[i].get('cvic_idcd') ,
			cvic_name		: selects[i].get('cvic_name'),
			cvic_stat_dvcd	: selects[i].get('cvic_stat_dvcd'),
			line_stat		: '0'
			});
		}
		store.add(record);
		store.sync({
			callback: function(batch, options) {
			} ,
			scope: me
		},{	synchro : _global.objects.synchro} );
		listeritem1.select({
			callback:function(records, operation, success) {
				if (success) {
					listeritem1.getSelectionModel().select(0);
				} else {
				}
			}, scope:me
		}, Ext.merge( {wkct_idcd : mrecord.get('wkct_idcd')},{stor_id : _global.stor_id}, {}) );
		store2.reload();
	},

	// > 삭제버튼 클릭
	oneremove:function() {
		var me = this,
			listeritem	= me.pocket.listeritem1(),
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

	//엑셀
	exportAction : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});