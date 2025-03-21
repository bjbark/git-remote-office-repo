Ext.define('module.custom.hantop.item.cstmitemmast.CstmItemMast', { extend:'Axt.app.Controller',

	models	: [
		'module.custom.hantop.item.cstmitemmast.model.CstmItemMast',
	],
	stores	: [
		'module.custom.hantop.item.cstmitemmast.store.CstmItemMast1',
		'module.custom.hantop.item.cstmitemmast.store.CstmItemMast2',
		'module.custom.hantop.item.cstmitemmast.store.CstmItemMast3',
		'module.custom.hantop.item.cstmitemmast.store.CstmItemMast4',
	],
	views	: [
		'module.custom.hantop.item.cstmitemmast.view.CstmItemMastLayout',
		'module.custom.hantop.item.cstmitemmast.view.CstmItemMastEditor',
		'module.custom.hantop.item.cstmitemmast.view.CstmItemMastLister1',
		'module.custom.hantop.item.cstmitemmast.view.CstmItemMastLister2',
		'module.custom.hantop.item.cstmitemmast.view.CstmItemMastLister3',
		'module.custom.hantop.item.cstmitemmast.view.CstmItemMastLister4',
		'module.custom.hantop.item.cstmitemmast.view.CstmItemMastSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-cstmitemmast-layout #mainpanel'						: { tabchange : me.selectAction		},
			'module-cstmitemmast-layout button[action=selectAction]'	: { click : me.selectAction },		// 조회
			// lister event
			'module-cstmitemmast-lister1 button[action=exportAction]'	: { click : me.exportAction1 },		// 엑셀
			'module-cstmitemmast-lister2 button[action=exportAction]'	: { click : me.exportAction2 },		// 엑셀
			'module-cstmitemmast-lister3 button[action=exportAction]'	: { click : me.exportAction3 },		// 엑셀
			'module-cstmitemmast-lister4 button[action=exportAction]'	: { click : me.exportAction4 },		// 엑셀

			// lister event
			'module-cstmitemmast-lister1' : {
				selectionchange : me.selectRecord
			},
			'module-cstmitemmast-lister2' : {
				selectionchange : me.selectRecord
			},
			'module-cstmitemmast-lister3' : {
				selectionchange : me.selectRecord
			},

			'module-cstmitemmast-search combobox[name=acct_dvcd]'		: { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-cstmitemmast-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-cstmitemmast-search') [0] },
		editor		: function () { return Ext.ComponentQuery.query('module-cstmitemmast-editor')[0] },
		lister1		: function () { return Ext.ComponentQuery.query('module-cstmitemmast-lister1')[0] },
		lister2		: function () { return Ext.ComponentQuery.query('module-cstmitemmast-lister2')[0] },
		lister3		: function () { return Ext.ComponentQuery.query('module-cstmitemmast-lister3')[0] },
		lister4		: function () { return Ext.ComponentQuery.query('module-cstmitemmast-lister4')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			lister1	= me.pocket.lister1(),
			lister2	= me.pocket.lister2(),
			lister3	= me.pocket.lister3(),
			lister4	= me.pocket.lister4(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			editor		= me.pocket.editor(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			temp = '',
			lister = undefined
		;

		if(param.acct_dvcd == '' || param.acct_dvcd == null){
			Ext.Msg.alert("알림","계정구분을 선택해주세요.");
			return;
		}

		if(tindex == 0){
			lister = lister1;
		}else if(tindex == 1){
			lister = lister2;
		}else if(tindex == 2){
			lister = lister3;
		}else if(tindex == 3){
			lister = lister4;
		}

		if(param.acct_dvcd == '3000'){			// 체크해서 tab hide show 처리
			lister.down('[dataIndex=wdbf_yorn]').hide();
			lister.down('[dataIndex=wdsf_yorn]').hide();
			lister.down('[dataIndex=wdmf_yorn]').hide();
			lister.down('[dataIndex=wdmc_yorn]').hide();
			lister.down('[dataIndex=bfrn_yorn]').hide();
			lister.down('[dataIndex=sfrn_yorn]').hide();
			lister.down('[dataIndex=mfrn_yorn]').hide();
			lister.down('[dataIndex=glss_yorn]').hide();
			lister.down('[dataIndex=wryp_yorn]').hide();
		}else{
			lister.down('[dataIndex=wdbf_yorn]').show();
			lister.down('[dataIndex=wdsf_yorn]').show();
			lister.down('[dataIndex=wdmf_yorn]').show();
			lister.down('[dataIndex=wdmc_yorn]').show();
			lister.down('[dataIndex=bfrn_yorn]').show();
			lister.down('[dataIndex=sfrn_yorn]').show();
			lister.down('[dataIndex=mfrn_yorn]').show();
			lister.down('[dataIndex=glss_yorn]').show();
			lister.down('[dataIndex=wryp_yorn]').show();
		}


		if(tindex==0 && (!Ext.isEmpty(search.getValues().acct_dvcd ))){
			lister1.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister1.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp}));
		}else if(tindex==1 && (!Ext.isEmpty(search.getValues().acct_dvcd ))){
			lister2.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		} else if(tindex==2 && (!Ext.isEmpty(search.getValues().acct_dvcd ))){
			lister3.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister3.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		} else if(tindex==3 && (!Ext.isEmpty(search.getValues().acct_dvcd ))){
			lister4.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister4.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},

	selectLookup:function() {
		this.selectAction();
	},

	//선택
	selectRecord:function( grid, record ){
		var me			= this,
			editor		= me.pocket.editor()
		;
		editor.selectRecord({ lister : me.pocket.lister1(), record : record }, me);
		editor.selectRecord({ lister : me.pocket.lister2(), record : record }, me);
		editor.selectRecord({ lister : me.pocket.lister3(), record : record }, me);
		editor.selectRecord({ lister : me.pocket.lister4(), record : record }, me);
	},


	// 엑셀
	exportAction1 : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.lister2().writer({enableLoadMask:true});
	},
	exportAction3 : function() {
		this.pocket.lister3().writer({enableLoadMask:true});
	},
	exportAction4 : function() {
		this.pocket.lister4().writer({enableLoadMask:true});
	},

});