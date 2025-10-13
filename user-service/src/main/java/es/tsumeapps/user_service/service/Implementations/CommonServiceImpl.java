package es.tsumeapps.user_service.service.Implementations;

import es.tsumeapps.user_service.dto.output.commonOutput.CommonOutput;
import es.tsumeapps.user_service.jpa.repository.LocationRepository;
import es.tsumeapps.user_service.jpa.repository.PlayStyleRepository;
import es.tsumeapps.user_service.jpa.repository.RolTypeRepository;
import es.tsumeapps.user_service.service.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommonServiceImpl implements CommonService {

    private final LocationRepository locationRepository;
    private final PlayStyleRepository playStyleRepository;
    private final RolTypeRepository rolTypeRepository;

    @Override
    public List<CommonOutput> getAllLocations() {
        return locationRepository.findAll().stream()
                .map(l -> new CommonOutput(l.getId(), l.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<CommonOutput> getAllPlayStyles() {
        return playStyleRepository.findAll().stream()
                .map(p -> new CommonOutput(p.getId(), p.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<CommonOutput> getAllRolTypes() {
        return rolTypeRepository.findAll().stream()
                .map(r -> new CommonOutput(r.getId(), r.getName()))
                .collect(Collectors.toList());
    }
}
