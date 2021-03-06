package weixin.manager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import weixin.manager.bean.SysRole;
import weixin.manager.mapper.SysRoleMapper;
import core.mapper.IBaseMapper;
import core.service.BaseService;

@Repository
public class SysRoleServiceImpl extends BaseService<SysRole> implements
		SysRoleService {
	@Autowired
	private SysRoleMapper sysRoleMapper;

	@Override
	public IBaseMapper<SysRole> getBaseMapper() {
		return sysRoleMapper;
	}

	@Override
	public List<SysRole> getSysRoleRefListByUserId(String userId) {
		return sysRoleMapper.getSysRoleRefListByUserId(userId);
	}

}
