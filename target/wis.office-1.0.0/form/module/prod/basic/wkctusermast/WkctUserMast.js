Ext.define('module.prod.basic.wkctusermast.WkctUserMast', { extend:'Axt.app.Controller',

	models	: [
			'module.prod.basic.wkctusermast.model.WkctUserMast',
			'module.prod.basic.wkctusermast.model.WkctUserDetail',
			'module.prod.basic.wkctusermast.model.WkctUserMastItem1',
			'module.prod.basic.wkctusermast.model.WkctUserMastItem2'
	],
	stores	: [
		'module.prod.basic.wkctusermast.store.WkctUserMast',
		'module.prod.basic.wkctusermast.store.WkctUserDetail',
		'module.prod.basic.wkctusermast.store.WkctUserMastItem1',
		'module.prod.basic.wkctusermast.store.WkctUserMastItem2'
	],
	views	: [
		'module.prod.basic.wkctusermast.view.WkctUserMastLayout',
		'module.prod.basic.wkctusermast.view.WkctUserMastSearch',
		'module.prod.basic.wkctusermast.view.WkctUserMastListerMaster',
		'module.prod.basic.wkctusermast.view.WkctUserMastListerDetail',
		'module.prod.basic.wkctusermast.view.WkctUserMastListerItem',
		'module.prod.basic.wkctusermast.view.WkctUserMastListerItem1',
		'module.prod.basic.wkctusermast.view.WkctUserMastListerItem2'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-wkctusermast-layout button[action=selectAction]'	: { click : me.selectAction },	// 조회
			'module-wkctusermast-layout button[action=enrollment]'	: { click : me.enrollment },	//1건등록(<)
			'module-wkctusermast-layout button[action=remove]'		: { click : me.remove },		//1건삭제(>)
			// lister detail event
			'module-wkctusermast-lister-detail button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister master event
			'module-wkctusermast-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-wkctusermast-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-wkctusermast-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-wkctusermast-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-wkctusermast-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-wkctusermast-lister-detail')[0] },
		listeritem	: function () { return Ext.ComponentQuery.query('module-wkctusermast-lister-item')[0] },
		listeritem1	: function () { return Ext.ComponentQuery.query('module-wkctusermast-lister-item1')[0] },
		listeritem2	: function () { return Ext.ComponentQuery.query('module-wkctusermast-lister-item2')[0] }
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
			Ext.Msg.alert("알림", "공정목록에서 검색하여주십시오.");
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
			}, { wkct_idcd : record.get('wkct_idcd') });
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
				Ext.Msg.alert("알림", "수정 또는 조회할 공정을 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var record = records[0]
			listeritem.down('[name = wkct_code]').setValue(record.get('wkct_code'));
			listeritem.down('[name = wkct_name]').setValue(record.get('wkct_name'));

			listeritem1.select({
				callback:function(records, operation, success) {
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
			}, Ext.merge( {stor_id : _global.stor_id}, {wkct_idcd : record.get('wkct_idcd')}) );
		}
	},

	// < enrollment
	enrollment:function() {
		var me			= this,
			record		= new Array(),
			seqn		= Number(1),
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
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/basic/wkctusermast/get/itemseqn.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					wkct_idcd : mrecord.get('wkct_idcd')
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
					seqn = result.records[0].line_seqn+1;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		var seqnArray = new Array();
		for (var int = 0; int < selects.length; int++) {
			seqnArray[int] = seqn++;
		}
		var i = 0;
		for( i = 0; i<selects.length; i++){
		record[i] = Ext.create( store.model.modelName , {
			_set			: 'insert',
			wkct_idcd		: mrecord.get('wkct_idcd'),
			line_seqn		: seqnArray[i],
			empy_dvcd		: selects[i].get('empy_dvcd'),
			empy_idcd		: selects[i].get('user_idcd'),
			empy_name		: selects[i].get('user_name'),
			labo_rate		: selects[i].get('labo_rate'),
			abty_dvcd		: selects[i].get('abty_dvcd'),
			wkkn_dvcd		: selects[i].get('wkkn_dvcd'),
			work_para_dvcd	: selects[i].get('work_para_dvcd'),
			join_date		: selects[i].get('join_date'),
			line_stat		:'0'
			});
		}
		store.add(record);
		store.sync({
			callback: function(batch, options) {
				listeritem1.select({
					callback:function(records, operation, success) {
						if (success) {
							listeritem1.getSelectionModel().select(0);
						} else {
						}
					}, scope:me
				}, Ext.merge( {wkct_idcd : mrecord.get('wkct_idcd')},{stor_id : _global.stor_id}, {}) );
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
//		this.pocket.listermaster().writer({enableLoadMask:true});
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});