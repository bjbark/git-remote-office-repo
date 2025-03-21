Ext.define('module.custom.hjsys.eis.eisreport.view.EisReportDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-hjsys-eisreport-lister-detail1',
	store		: 'module.custom.hjsys.eis.eisreport.store.EisReportDetail1',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	border		: 0,
	columnLines : true,
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return "EiscellSmall";
		}
	},
	initComponent: function () {
		var me = this;
		me.dockedItems = [ me.createwest()];
		me.columns = me.columnItem();
		me.callParent();
		me.selects();
	},
	listeners:{
		destroy:function(){
			clearInterval(window.eisDetail);
		}
	},
	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'top',
				layout			: 'fit',
				height			: 40,
				bodyStyle		: { padding: '0px' },
				fieldDefaults	: { labelSeparator : '' },
				items			: [
					{	xtype		: 'textfield',
						name		: 'screen',
						itemId		: 'EisScreen',
						readOnly	: true,
						fieldStyle	: 'text-align: center;font-size:2.5em !important;bold:3'
					}
				]
			}
		;
		return item;
	},
	columnItem : function () {
		var me = this,
			cvic = {
				region	: 'center',
				cls		: 'Eisgrid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items	: [
					{	xtype: 'rownumberer', text : Language.get(''	,'NO'		) , width : 60	, align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get(''	,'업체명'	) , flex : 1, minWidth : 160 , align : 'left', summaryType:'count'
					},{	dataIndex: 'modl_name'		, text : Language.get(''	,'모델명'	) , flex : 1, minWidth : 320 , align : 'left'
					},{	dataIndex: 'invc_date'		, text : Language.get(''	,'발주일'	) , width : 130 , align : 'left'
					},{	dataIndex: 'acpt_qntt'		, text : Language.get(''	,'수량'		) , width : 70 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: 'unit_name'		, text : Language.get(''	,'단위'		) , width : 70 , align : 'center'
					},{	dataIndex: 'wkct_1'			, text : Language.get(''	,'프로<br>그램'	) , width : 75 , align : 'left',
						renderer : function(value, meta) {
							if(parseInt(value.substr(0,1)) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value.substr(0,1)) == 2) {
								meta.style = "background-color:green;";
							}
							if(value.length>=2){
								return value.substring(1,value.length);
							}
						}
					},{	dataIndex: 'wkct_2'			, text : Language.get(''	,'레이저'	) , width : 75 , align : 'left',
						renderer : function(value, meta) {
							if(parseInt(value.substr(0,1)) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value.substr(0,1)) == 2) {
								meta.style = "background-color:green;";
							}
							if(value.length>=2){
								return value.substring(1,value.length);
							}
						}
					},{	dataIndex: 'wkct_3'			, text : Language.get(''	,'NCT'		) , width : 75 , align : 'left',
						renderer : function(value, meta) {
							if(parseInt(value.substr(0,1)) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value.substr(0,1)) == 2) {
								meta.style = "background-color:green;";
							}
							if(value.length>=2){
								return value.substring(1,value.length);
							}
						}
					},{	dataIndex: 'wkct_4'			, text : Language.get(''	,'절곡'		) , width : 75 , align : 'left',
						renderer : function(value, meta) {
							if(parseInt(value.substr(0,1)) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value.substr(0,1)) == 2) {
								meta.style = "background-color:green;";
							}
							if(value.length>=2){
								return value.substring(1,value.length);
							}
						}
					},{	dataIndex: 'wkct_5'			, text : Language.get(''	,'용접'		) , width : 75 , align : 'left',
						renderer : function(value, meta) {
							if(parseInt(value.substr(0,1)) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value.substr(0,1)) == 2) {
								meta.style = "background-color:green;";
							}
							if(value.length>=2){
								return value.substring(1,value.length);
							}
						}
					},{	dataIndex: 'wkct_6'			, text : Language.get(''	,'후가공'	) , width : 70 , align : 'left',
						renderer : function(value, meta) {
							if(parseInt(value.substr(0,1)) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value.substr(0,1)) == 2) {
								meta.style = "background-color:green;";
							}
							if(value.length>=2){
								return value.substring(1,value.length);
							}
						}
					},{	dataIndex: 'wkct_7'			, text : Language.get(''	,'도금'		) , width : 60 , align : 'left',
						renderer : function(value, meta,cont) {
							var	wkct7  = cont.get('wkct_7'),
								wkct8  = cont.get('wkct_8'),
								wkct9  = cont.get('wkct_9')
							;
							if(wkct7 != ""){
								if(wkct7 == wkct8 && wkct7 == wkct9){
									meta.tdAttr = 'colspan=3';
									return value;
								}else if (wkct7 == wkct8 && wkct7 != wkct9){
									meta.tdAttr = 'colspan=2';
									return value;
								}else{
									return value;
								}
							}
						}
					},{	dataIndex: 'wkct_8'			, text : Language.get(''	,'도장'		) , width : 60 , align : 'left',
						renderer : function(value, meta,cont) {
							var	wkct7  = cont.get('wkct_7'),
								wkct8  = cont.get('wkct_8'),
								wkct9  = cont.get('wkct_9')
							;
							if(wkct8!=""){
								if(wkct7 == wkct8 && wkct7 == wkct9){
									meta.tdAttr = 'style="display:none"';
								}else if (wkct7 == wkct8 && wkct7 != wkct9){
									meta.tdAttr = 'style="display:none"';
								}else if (wkct7 != wkct8 && wkct8 == wkct9){
									meta.tdAttr = 'colspan=2';
									return value;
								}else if(wkct7 != wkct8 && wkct8 != wkct9){
									return value;
								}
							}
						}
					},{	dataIndex: 'wkct_9'			, text : Language.get(''	,'외주<br>가공'	) , width : 60 , align : 'left',
						renderer : function(value, meta,cont) {
							var	wkct7  = cont.get('wkct_7'),
								wkct8  = cont.get('wkct_8'),
								wkct9  = cont.get('wkct_9')
							;
							if(wkct9!=""){
								if(wkct7 == wkct8 && wkct7 == wkct9){
									meta.tdAttr = 'style="display:none"';
								}else if (wkct7 != wkct8 && wkct8 == wkct9){
									meta.tdAttr =  'style="display:none"';
									return value;
								}else	if (wkct8 != wkct9){
									return value;
								}
							}
						}
					},{	dataIndex: 'deli_date'		, text : Language.get(''	,'납품일'	) , width : 130 , align : 'left'
					},{	dataIndex: 'ostt_date'		, text : Language.get(''	,'완료일'	) , width : 130 , align : 'left'
					},{	dataIndex: 'user_memo'		, text : Language.get(''	,'비고'		) , flex : 1, minWidth : 200 , align : 'left'
					}
				]
			}
		;
		return cvic;
	},
	selects:function(){
		var me		= this,
			month   = Ext.Date.format(new Date(),'m'),
			store  = me.getStore()
		;
		setTimeout(function(){
			if(!window.eisDetail){
				window.eisDetail = setInterval(function(){
					me.select({
						callback:function(records, operation, success) {
							if (success) {
								var record = store.getAt(0);
								if(record){
									me.down('[itemId=EisScreen]').setValue(Ext.Date.format(new Date(),'Y년m월')+' '+record.get('weekcnt')+'주차 진행현황')
								}
							}
							else {}
						}
					}, Ext.merge( {
						stor_id : _global.stor_id,
					}) );
				},60000);
			}
			me.select({
				callback:function(records, operation, success) {
					if (success) {
						var record = store.getAt(0);
						if(record){
							me.down('[itemId=EisScreen]').setValue(Ext.Date.format(new Date(),'Y년m월')+' '+record.get('weekcnt')+'주차 진행현황')
						}
					}
					else {}
				}
			}, Ext.merge( {
				stor_id : _global.stor_id,
			}) );
		}, 500)
	}
});
