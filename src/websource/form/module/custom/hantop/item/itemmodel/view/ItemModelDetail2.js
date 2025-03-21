Ext.define('module.custom.hantop.item.itemmodel.view.ItemModelDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemmodel-detail2',
	store		: 'module.custom.hantop.item.itemmodel.store.ItemModelDetail2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
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
				items : [
					,'-','->', '-',
					{text : '<span class="write-button">모델을 품목정보에 등록</span>'	, action : 'ItemAction'	, width : 150	, cls: 'button1-style'}, '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style'},
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , cls: 'button-style'},
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style'},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , cls: 'button-style'},
					]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'wndw_modl_code'			, text : Language.get('wndw_modl_code'			,'창호모델코드'			)  , width : 120 , align : 'center'
					},{ dataIndex: 'modl_name'				, text : Language.get('modl_name'				,'모델명'				)  , width : 180 , align : 'left'
					},{ dataIndex: 'wdbf_itid'				, text : Language.get('wdbf_itid'				,'BF품목'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdsf_itid'				, text : Language.get('wdsf_itid'				,'SF품목'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdmc_itid'				, text : Language.get('wdmc_itid'				,'MC품목'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdmf_itid'				, text : Language.get('wdmf_itid'				,'MF품목'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdgb_itid'				, text : Language.get('wdgb_itid'				,'GB품목'				)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdbf_rein_itid'			, text : Language.get('wdbf_rein_name'			,'BF보강재'			)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdsf_rein_itid'			, text : Language.get('wdsf_rein_name'			,'SF보강재'			)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdmf_rein_itid'			, text : Language.get('wdmf_rein_itid'			,'MF보강재'			)  , width : 120 , align : 'left'
					},{ dataIndex: 'wdbf_widh'				, text : Language.get('wdbf_widh'				,'BF폭'				)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdsf_widh'				, text : Language.get('wdsf_widh'				,'SF폭'				)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdbf_rail_hght'			, text : Language.get('wdbf_rail_hght'			,'<center style="margin-top:5px;">BF레일</br>높이</center>'		) , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdbf_hght'				, text : Language.get('wdbf_hght'				,'BF높이'				)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdsf_hght'				, text : Language.get('wdsf_hght'				,'SF높이'				)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'side_clmm'				, text : Language.get('side_clmm'				,'<center style="margin-top:5px;">측부</br>걸림차수</center>'		) , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdmc_tick'				, text : Language.get('wdmc_tick'				,'MC두께'				)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'glss_fixh_hght'			, text : Language.get('glss_fixh_hght'			,'<center style="margin-top:5px;">유리고정</br>턱높이</center>'		) , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'topp_clmm'				, text : Language.get('topp_clmm'				,'<center style="margin-top:5px;">상부</br>걸림치수</center>'		) , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'bttm_clmm'				, text : Language.get('bttm_clmm'				,'<center style="margin-top:5px;">하부</br>걸림치수</center>'		) , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdmf_side_clmm'			, text : Language.get('wdmf_side_clmm'			,'<center style="margin-top:5px;">MF가로</br>보정치수</center>'	) , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdmf_topp_clmm'			, text : Language.get('wdmf_topp_clmm'			,'<center style="margin-top:5px;">MF상부</br>걸림치수</center>'	) , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdmf_bttm_clmm'			, text : Language.get('wdmf_bttm_clmm'			,'<center style="margin-top:5px;">MF하부</br>걸림치수</center>'	) , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'ssbr_hght'				, text : Language.get('ssbr_hght'				,'<center style="margin-top:5px;">SS바</br>높이</center>'			) , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'moss_rail_hght'			, text : Language.get('moss_rail_hght'			,'<center style="margin-top:5px;">BF방충망</br>레일높이</center>'	) , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'wdmf_hght'				, text : Language.get('wdmf_hght'				,'MF높이'				)  , width :  65 , align : 'right'	   ,xtype : 'numericcolumn'
					},{ dataIndex: 'athd_csvl'				, text : Language.get('athd_csvl'				,'<center style="margin-top:5px;">자동</br>핸들보정</center>'		) , width :  65 ,xtype:'numericcolumn'
					},{ dataIndex: 'mnhd_csvl'				, text : Language.get('mnhd_csvl'				,'<center style="margin-top:5px;">수동</br>핸들보정</center>'		) , width :  65 ,xtype:'numericcolumn'
					},{ dataIndex: 'wdbf_auto_cutt_yorn'	, text : Language.get('wdbf_auto_cutt_yorn'		,'<center style="margin-top:5px;">BF자동</br>절단여부</center>'	) , width :  65 , align : 'center'	   ,xtype : 'lookupcolumn',lookupValue:resource.lookup('yorn')
					},{ dataIndex: 'wdbf_auto_weld_yorn'	, text : Language.get('wdbf_auto_weld_yorn'		,'<center style="margin-top:5px;">BF자동</br>용접여부</center>'	) , width :  65 , align : 'center'	   ,xtype : 'lookupcolumn',lookupValue:resource.lookup('yorn')
					},{ dataIndex: 'wdsf_auto_cutt_yorn'	, text : Language.get('wdsf_auto_cutt_yorn'		,'<center style="margin-top:5px;">SF자동</br>절단여부</center>'	) , width :  65 , align : 'center'	   ,xtype : 'lookupcolumn',lookupValue:resource.lookup('yorn')
					},{ dataIndex: 'wdsf_auto_weld_yorn'	, text : Language.get('wdsf_auto_weld_yorn'		,'<center style="margin-top:5px;">SF자동</br>용접여부</center>'	) , width :  65 , align : 'center'	   ,xtype : 'lookupcolumn',lookupValue:resource.lookup('yorn')
					}
				]
			}
		;
		return item;
	}
});